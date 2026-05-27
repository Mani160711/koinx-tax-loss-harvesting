import React from 'react';
import SummaryCard from './SummaryCard';

/**
 * SummarySection Component
 * Arranges Pre-Harvest and After-Harvest cards side-by-side or stacked.
 */
const SummarySection = React.memo(({ preHarvest, afterHarvest }) => {
  return (
    <section 
      className="max-w-[1440px] mx-auto px-4 md:px-8 mb-6"
      aria-label="Capital Gains Summary"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pre-Harvest Card */}
        <SummaryCard
          title="Pre-Harvest Capital Gains"
          stcg={preHarvest.stcg}
          ltcg={preHarvest.ltcg}
          realised={preHarvest.realised}
          type="pre"
        />

        {/* After-Harvest Card */}
        <SummaryCard
          title="After-Harvest Capital Gains"
          stcg={afterHarvest.stcg}
          ltcg={afterHarvest.ltcg}
          realised={afterHarvest.effective}
          type="after"
        />
      </div>
    </section>
  );
});

SummarySection.displayName = 'SummarySection';

export default SummarySection;
