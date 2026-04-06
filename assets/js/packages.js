/* ================================================================
   RaydeeSolar — Packages & Calculator Logic (packages.js)
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const inpBill = document.getElementById('inpBill');
  const lblBill = document.getElementById('lblBill');
  const inpRoof = document.getElementById('inpRoof');
  const inpRegion = document.getElementById('inpRegion');
  const usageRadios = document.querySelectorAll('input[name="usage"]');

  const outSystem = document.getElementById('outSystem');
  const outSave = document.getElementById('outSave');
  const outCost = document.getElementById('outCost');
  const outROI = document.getElementById('outROI');
  const roiBar = document.getElementById('roiBar');

  function calculateSolar() {
    const bill = parseInt(inpBill.value);
    lblBill.textContent = bill.toLocaleString();

    // 1. Calculate Recommended Size
    // Rough estimate: 1 kW generates ~120-140 units/month. ~500-600 THB/month.
    let recommendedKw = Math.max(3, Math.round((bill / 500) * 10) / 10);
    
    // Suggest standard sizes (3, 5, 10, 15, 20+)
    if (recommendedKw < 4) recommendedKw = 3;
    else if (recommendedKw < 7) recommendedKw = 5;
    else if (recommendedKw < 12) recommendedKw = 10;
    else if (recommendedKw < 17) recommendedKw = 15;
    else recommendedKw = Math.ceil(recommendedKw / 5) * 5; // Snap to 5kW increments
    
    // 2. Savings Calculation
    let saveFactor = 500; // base saving per kW per month
    const region = inpRegion.value;
    if (region === 'south') saveFactor *= 1.1; // Better sun
    else if (region === 'north') saveFactor *= 0.95; 
    
    const usage = document.querySelector('input[name="usage"]:checked').value;
    if (usage === 'night') saveFactor *= 0.6; // Less savings if not used during day

    const estimatedSavings = Math.round(recommendedKw * saveFactor);
    // Cap savings to bill amount
    const finalSavings = Math.min(estimatedSavings, bill);

    // 3. Cost Calculation
    let basePricePerKw = 30000;
    if (recommendedKw >= 10) basePricePerKw = 26000; // cheaper at scale
    
    // Roof adjustments (deck/flat roof usually needs more structure)
    const roof = inpRoof.value;
    if (roof === 'deck') basePricePerKw += 2000;
    else if (roof === 'cpac') basePricePerKw += 500;

    const minCost = recommendedKw * basePricePerKw;
    const maxCost = minCost * 1.15; // +15% margin

    // 4. ROI (Return on Investment in Years)
    // ROI = Cost / Yearly Savings
    const yearlySavings = finalSavings * 12;
    const avgCost = (minCost + maxCost) / 2;
    const roi = parseFloat((avgCost / yearlySavings).toFixed(1));

    // Update DOM
    outSystem.textContent = recommendedKw;
    outSave.textContent = finalSavings.toLocaleString();
    outCost.textContent = `${Math.round(minCost / 1000)}k - ${Math.round(maxCost / 1000)}k`;
    outROI.textContent = roi;

    // Update ROI Bar (scale 0-10 years)
    let percent = (roi / 10) * 100;
    if (percent > 100) percent = 100;
    roiBar.style.width = `${percent}%`;

    // Dynamic coloring for ROI Bar
    if (roi <= 4) roiBar.style.background = 'linear-gradient(90deg, #16a34a 0%, #22c55e 100%)'; // Good
    else if (roi <= 6) roiBar.style.background = 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'; // OK
    else roiBar.style.background = 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)'; // Long
  }

  // Event Listeners
  if (inpBill) {
    inpBill.addEventListener('input', calculateSolar);
    inpRoof.addEventListener('change', calculateSolar);
    inpRegion.addEventListener('change', calculateSolar);
    usageRadios.forEach(r => r.addEventListener('change', calculateSolar));
    
    // Initial calculation
    calculateSolar();
  }
});
