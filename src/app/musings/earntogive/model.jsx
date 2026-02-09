import { useState, useMemo, useEffect } from "react";

const LIGHT = {
  bg: "#ffffff",
  surface: "#f5f5f5",
  surfaceLight: "#fafafa",
  border: "#e5e5e5",
  text: "#171717",
  textMuted: "#737373",
  accent: "#d97706",
  accentDim: "rgba(217, 119, 6, 0.1)",
  red: "#dc2626",
  redDim: "rgba(220, 38, 38, 0.1)",
  green: "#059669",
  greenDim: "rgba(5, 150, 105, 0.1)",
  blue: "#2563eb",
  blueDim: "rgba(37, 99, 235, 0.1)",
  purple: "#7c3aed",
  purpleDim: "rgba(124, 58, 237, 0.1)",
};

const DARK = {
  bg: "#0a0a0a",
  surface: "#171717",
  surfaceLight: "#1c1c1c",
  border: "#2e2e2e",
  text: "#f5f5f5",
  textMuted: "#a3a3a3",
  accent: "#f59e0b",
  accentDim: "rgba(245, 158, 11, 0.15)",
  red: "#ef4444",
  redDim: "rgba(239, 68, 68, 0.15)",
  green: "#10b981",
  greenDim: "rgba(16, 185, 129, 0.15)",
  blue: "#3b82f6",
  blueDim: "rgba(59, 130, 246, 0.15)",
  purple: "#a78bfa",
  purpleDim: "rgba(167, 139, 250, 0.15)",
};

function useThemeColors() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const handler = (e) => setIsDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDark ? DARK : LIGHT;
}

function solveModel({ totalWealth, richShare, donationPctRich, donationPctPoor, totalSkilledPeople, pctSkilledWorking, numProblems, costPerProblem, workersPerProblem, workerSalary, spilloverFactor }) {
  const richWealth = totalWealth * (richShare / 100);
  const poorWealth = totalWealth - richWealth;

  const skilledWorking = Math.round(totalSkilledPeople * (pctSkilledWorking / 100));
  const skilledEarning = totalSkilledPeople - skilledWorking;

  const donationsRich = richWealth * (donationPctRich / 100);
  const donationsPoor = poorWealth * (donationPctPoor / 100);
  const donationsSkilledEarners = skilledEarning * workerSalary * 5 * (donationPctRich / 100);
  const spilloverValue = skilledEarning * workerSalary * spilloverFactor;
  const totalFunding = donationsRich + donationsPoor + donationsSkilledEarners + spilloverValue;

  const totalWorkerCost = numProblems * workersPerProblem * workerSalary;
  const fundableWorkers = Math.floor(totalFunding / workerSalary);

  const problemsSolvedByWorkers = Math.floor(skilledWorking / workersPerProblem);
  const problemsSolvedByFunding = Math.floor(totalFunding / costPerProblem);
  const problemsSolved = Math.min(problemsSolvedByWorkers, problemsSolvedByFunding, numProblems);

  const allSolved = problemsSolved >= numProblems;
  const workerBottleneck = !allSolved && problemsSolvedByWorkers < problemsSolvedByFunding;
  const fundingBottleneck = !allSolved && !workerBottleneck;

  return {
    skilledWorking,
    skilledEarning,
    donationsRich,
    donationsPoor,
    donationsSkilledEarners,
    spilloverValue,
    totalFunding,
    fundableWorkers,
    problemsSolvedByWorkers,
    problemsSolvedByFunding,
    problemsSolved,
    allSolved,
    workerBottleneck,
    fundingBottleneck,
    totalWorkerCost,
  };
}

function generatePlotData(baseParams, COLORS) {
  const donationRange = [];
  for (let d = 0; d <= 50; d += 1) {
    donationRange.push(d);
  }

  const scenarios = [
    { label: "80% deploy, 20% earn", pctWorking: 80, color: COLORS.green },
    { label: "60% deploy, 40% earn", pctWorking: 60, color: COLORS.blue },
    { label: "40% deploy, 60% earn", pctWorking: 40, color: COLORS.accent },
    { label: "20% deploy, 80% earn", pctWorking: 20, color: COLORS.red },
    { label: "5% deploy, 95% earn", pctWorking: 5, color: COLORS.purple },
  ];

  return { donationRange, scenarios, data: scenarios.map(s => ({
    ...s,
    points: donationRange.map(d => {
      const result = solveModel({
        ...baseParams,
        donationPctRich: d,
        donationPctPoor: Math.max(0, d - 3),
        pctSkilledWorking: s.pctWorking,
      });
      return {
        donation: d,
        pctSolved: (result.problemsSolved / baseParams.numProblems) * 100,
        bottleneck: result.workerBottleneck ? "workers" : "funding",
      };
    }),
  }))};
}

function MiniChart({ data, baseParams, COLORS, width = 700, height = 340 }) {
  const [hover, setHover] = useState(null);
  const padL = 56, padR = 24, padT = 20, padB = 44;
  const cw = width - padL - padR;
  const ch = height - padT - padB;

  const xScale = (v) => padL + (v / 50) * cw;
  const yScale = (v) => padT + ch - (v / 100) * ch;

  const gridLinesY = [0, 25, 50, 75, 100];
  const gridLinesX = [0, 10, 20, 30, 40, 50];

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block", maxWidth: "100%" }}>
      <rect x={0} y={0} width={width} height={height} fill={COLORS.surface} rx={8} />

      {gridLinesY.map(v => (
        <g key={`gy-${v}`}>
          <line x1={padL} x2={width - padR} y1={yScale(v)} y2={yScale(v)} stroke={COLORS.border} strokeWidth={0.5} />
          <text x={padL - 8} y={yScale(v) + 4} fill={COLORS.textMuted} fontSize={11} textAnchor="end" fontFamily="monospace">{v}%</text>
        </g>
      ))}
      {gridLinesX.map(v => (
        <g key={`gx-${v}`}>
          <line x1={xScale(v)} x2={xScale(v)} y1={padT} y2={height - padB} stroke={COLORS.border} strokeWidth={0.5} />
          <text x={xScale(v)} y={height - padB + 16} fill={COLORS.textMuted} fontSize={11} textAnchor="middle" fontFamily="monospace">{v}%</text>
        </g>
      ))}

      <text x={width / 2} y={height - 4} fill={COLORS.textMuted} fontSize={11} textAnchor="middle" fontFamily="monospace">
        Donation rate (% of wealth)
      </text>
      <text x={14} y={height / 2} fill={COLORS.textMuted} fontSize={11} textAnchor="middle" fontFamily="monospace" transform={`rotate(-90, 14, ${height / 2})`}>
        Problems solved
      </text>

      {data.data.map((scenario, si) => {
        const pathD = scenario.points.map((p, i) =>
          `${i === 0 ? "M" : "L"} ${xScale(p.donation)} ${yScale(p.pctSolved)}`
        ).join(" ");

        return (
          <g key={si}>
            <path d={pathD} fill="none" stroke={scenario.color} strokeWidth={2.5} strokeLinejoin="round" opacity={0.9} />
          </g>
        );
      })}

      {hover !== null && (
        <line x1={xScale(hover)} x2={xScale(hover)} y1={padT} y2={height - padB} stroke={COLORS.textMuted} strokeWidth={1} strokeDasharray="3,3" />
      )}

      <rect
        x={padL} y={padT} width={cw} height={ch}
        fill="transparent"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const donation = Math.round((x / cw) * 50);
          setHover(Math.max(0, Math.min(50, donation)));
        }}
        onMouseLeave={() => setHover(null)}
      />

      {hover !== null && data.data.map((scenario, si) => {
        const p = scenario.points[hover];
        if (!p) return null;
        return (
          <g key={`dot-${si}`}>
            <circle cx={xScale(p.donation)} cy={yScale(p.pctSolved)} r={4} fill={scenario.color} stroke={COLORS.surface} strokeWidth={2} />
          </g>
        );
      })}

      {hover !== null && (
        <g>
          <rect x={xScale(hover) + 10} y={padT + 4} width={195} height={data.data.length * 18 + 12} fill={COLORS.bg} rx={4} stroke={COLORS.border} opacity={0.95} />
          <text x={xScale(hover) + 18} y={padT + 20} fill={COLORS.text} fontSize={10} fontFamily="monospace" fontWeight="bold">
            Donation: {hover}%
          </text>
          {data.data.map((scenario, si) => {
            const p = scenario.points[hover];
            if (!p) return null;
            return (
              <text key={si} x={xScale(hover) + 18} y={padT + 38 + si * 18} fill={scenario.color} fontSize={10} fontFamily="monospace">
                {scenario.label}: {p.pctSolved.toFixed(0)}% [{p.bottleneck}]
              </text>
            );
          })}
        </g>
      )}
    </svg>
  );
}

function Slider({ label, value, onChange, min, max, step = 1, unit = "", color, COLORS }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "monospace" }}>{label}</span>
        <span style={{ fontSize: 12, color, fontFamily: "monospace", fontWeight: "bold" }}>{value.toLocaleString()}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          accentColor: color,
          height: 4,
        }}
      />
    </div>
  );
}

function StatCard({ label, value, sub, color, COLORS }) {
  return (
    <div style={{
      background: COLORS.surfaceLight,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 8,
      padding: "12px 16px",
      flex: 1,
      minWidth: 140,
    }}>
      <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "monospace", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, color, fontFamily: "monospace", fontWeight: "bold" }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: "monospace", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export default function EarnToGiveModel() {
  const COLORS = useThemeColors();

  const [totalWealth] = useState(1000000);
  const [richShare, setRichShare] = useState(80);
  const [donationPctRich, setDonationPctRich] = useState(5);
  const [donationPctPoor, setDonationPctPoor] = useState(2);
  const [totalSkilledPeople, setTotalSkilledPeople] = useState(500);
  const [pctSkilledWorking, setPctSkilledWorking] = useState(60);
  const [numProblems] = useState(10);
  const [costPerProblem] = useState(20000);
  const [workersPerProblem, setWorkersPerProblem] = useState(30);
  const [workerSalary] = useState(50);
  const [spilloverFactor, setSpilloverFactor] = useState(0.1);

  const baseParams = {
    totalWealth, richShare, donationPctRich, donationPctPoor,
    totalSkilledPeople, pctSkilledWorking, numProblems,
    costPerProblem, workersPerProblem, workerSalary, spilloverFactor,
  };

  const result = useMemo(() => solveModel(baseParams), [
    totalWealth, richShare, donationPctRich, donationPctPoor,
    totalSkilledPeople, pctSkilledWorking, numProblems,
    costPerProblem, workersPerProblem, workerSalary, spilloverFactor,
  ]);

  const plotData = useMemo(() => generatePlotData(baseParams, COLORS), [
    totalWealth, richShare, totalSkilledPeople, numProblems,
    costPerProblem, workersPerProblem, workerSalary, spilloverFactor, COLORS,
  ]);

  const pctSolved = ((result.problemsSolved / numProblems) * 100).toFixed(0);
  const bottleneckColor = result.allSolved ? COLORS.green : result.workerBottleneck ? COLORS.red : COLORS.accent;

  return (
    <div style={{
      background: COLORS.bg,
      color: COLORS.text,
      fontFamily: "monospace",
      padding: "24px 20px",
    }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6, marginBottom: 20 }}>
          Hover over the chart to explore scenarios. Adjust the sliders to change model parameters.
        </p>

        {/* Abundance context */}
        <div style={{
          background: COLORS.surfaceLight,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 8,
          padding: 14,
          marginBottom: 16,
          display: "flex",
          gap: 24,
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          <div style={{ fontSize: 12, color: COLORS.textMuted }}>
            Total wealth: <span style={{ color: COLORS.green, fontWeight: "bold" }}>1,000,000</span> — needed: <span style={{ color: COLORS.text }}>{(costPerProblem * numProblems).toLocaleString()}</span> <span style={{ color: COLORS.green }}>(5x surplus)</span>
          </div>
          <div style={{ fontSize: 12, color: COLORS.textMuted }}>
            Skilled people: <span style={{ color: COLORS.green, fontWeight: "bold" }}>{totalSkilledPeople}</span> — needed: <span style={{ color: COLORS.text }}>{workersPerProblem * numProblems}</span> <span style={{ color: COLORS.green }}>({(totalSkilledPeople / (workersPerProblem * numProblems)).toFixed(1)}x surplus)</span>
          </div>
        </div>

        {/* Current scenario stats */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
          <StatCard
            COLORS={COLORS}
            label="Problems solved"
            value={`${result.problemsSolved} / ${numProblems}`}
            sub={`${pctSolved}% of critical problems`}
            color={result.problemsSolved >= numProblems * 0.7 ? COLORS.green : result.problemsSolved >= numProblems * 0.3 ? COLORS.accent : COLORS.red}
          />
          <StatCard
            COLORS={COLORS}
            label="Bottleneck"
            value={result.allSolved ? "NONE" : result.workerBottleneck ? "WORKERS" : "FUNDING"}
            sub={result.allSolved ? "All problems solved" : result.workerBottleneck ? `Only ${result.skilledWorking} of ${workersPerProblem * numProblems} needed` : `${result.totalFunding.toLocaleString()} of ${(costPerProblem * numProblems).toLocaleString()} needed`}
            color={bottleneckColor}
          />
          <StatCard
            COLORS={COLORS}
            label="Skilled allocation"
            value={`${result.skilledWorking} / ${result.skilledEarning}`}
            sub="deploying / earning"
            color={COLORS.blue}
          />
          <StatCard
            COLORS={COLORS}
            label="Total funding"
            value={`${(result.totalFunding / 1000).toFixed(0)}k`}
            sub={`of ${(costPerProblem * numProblems / 1000).toFixed(0)}k needed`}
            color={COLORS.purple}
          />
        </div>

        {/* Chart */}
        <div style={{
          background: COLORS.surface,
          borderRadius: 12,
          border: `1px solid ${COLORS.border}`,
          padding: 16,
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 12 }}>
            PROBLEMS SOLVED vs. DONATION RATE — by skill deployment
          </div>
          <MiniChart data={plotData} baseParams={baseParams} COLORS={COLORS} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 12, justifyContent: "center" }}>
            {plotData.data.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 3, background: s.color, borderRadius: 2 }} />
                <span style={{ fontSize: 10, color: s.color, fontFamily: "monospace" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div style={{
          background: COLORS.surface,
          borderRadius: 12,
          border: `1px solid ${COLORS.border}`,
          padding: 20,
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 16, fontWeight: "bold" }}>
            ADJUST MODEL PARAMETERS
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
            <Slider COLORS={COLORS} label="Rich donation rate" value={donationPctRich} onChange={setDonationPctRich} min={0} max={50} unit="%" color={COLORS.accent} />
            <Slider COLORS={COLORS} label="Poor donation rate" value={donationPctPoor} onChange={setDonationPctPoor} min={0} max={20} unit="%" color={COLORS.accent} />
            <Slider COLORS={COLORS} label="% deploying their skills on problems" value={pctSkilledWorking} onChange={setPctSkilledWorking} min={0} max={100} unit="%" color={COLORS.blue} />
            <Slider COLORS={COLORS} label="Total skilled people" value={totalSkilledPeople} onChange={setTotalSkilledPeople} min={100} max={1000} unit="" color={COLORS.green} />
            <Slider COLORS={COLORS} label="Workers needed per problem" value={workersPerProblem} onChange={setWorkersPerProblem} min={10} max={80} unit="" color={COLORS.purple} />
            <Slider COLORS={COLORS} label="Rich wealth share" value={richShare} onChange={setRichShare} min={50} max={95} unit="%" color={COLORS.red} />
            <Slider COLORS={COLORS} label="Industry spillover factor" value={spilloverFactor} onChange={setSpilloverFactor} min={0} max={1} step={0.05} unit="x" color={COLORS.textMuted} />
          </div>
        </div>

        {/* Funding breakdown */}
        <div style={{
          background: COLORS.surface,
          borderRadius: 12,
          border: `1px solid ${COLORS.border}`,
          padding: 20,
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 12, fontWeight: "bold" }}>
            FUNDING BREAKDOWN
          </div>
          {[
            { label: "Rich donations", value: result.donationsRich, color: COLORS.accent },
            { label: "Poor donations", value: result.donationsPoor, color: COLORS.blue },
            { label: "Skilled earner donations", value: result.donationsSkilledEarners, color: COLORS.purple },
            { label: "Industry spillover value", value: result.spilloverValue, color: COLORS.textMuted },
          ].map((row, i) => {
            const pct = result.totalFunding > 0 ? (row.value / result.totalFunding) * 100 : 0;
            return (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: COLORS.textMuted, marginBottom: 2 }}>
                  <span>{row.label}</span>
                  <span style={{ color: row.color }}>{row.value.toLocaleString()} credits ({pct.toFixed(1)}%)</span>
                </div>
                <div style={{ height: 4, background: COLORS.bg, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: row.color, borderRadius: 2, transition: "width 0.3s" }} />
                </div>
              </div>
            );
          })}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.text, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${COLORS.border}` }}>
            <span style={{ fontWeight: "bold" }}>Total available</span>
            <span style={{ fontWeight: "bold", color: result.totalFunding >= costPerProblem * numProblems ? COLORS.green : COLORS.red }}>
              {result.totalFunding.toLocaleString()} / {(costPerProblem * numProblems).toLocaleString()} needed
            </span>
          </div>
        </div>

        <div style={{ fontSize: 10, color: COLORS.textMuted, textAlign: "center", padding: "8px 0" }}>
          Model parameters are simplified for illustration. Reality has more variables — but the coordination dynamics hold.
        </div>
      </div>
    </div>
  );
}
