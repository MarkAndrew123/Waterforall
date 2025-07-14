export default function CrisisFacts() {
  return (
    <div className="py-16 bg-gradient-to-r from-water-blue to-clean-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Water Crisis by Numbers</h2>
          <p className="text-lg max-w-3xl mx-auto">
            Understanding the scale of the global water crisis helps us work together toward solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center fade-in">
            <div className="text-6xl font-bold impact-orange mb-2">1 in 10</div>
            <p className="text-lg">People worldwide lack access to clean water</p>
          </div>
          <div className="text-center fade-in">
            <div className="text-6xl font-bold impact-orange mb-2">1 in 4</div>
            <p className="text-lg">Children will face water scarcity by 2040</p>
          </div>
          <div className="text-center fade-in">
            <div className="text-6xl font-bold impact-orange mb-2">2 billion</div>
            <p className="text-lg">People lack safely managed sanitation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
