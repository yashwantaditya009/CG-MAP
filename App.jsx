import React, { useState } from 'react';
import { MapPin, Info, Mountain, Trees, Factory, Landmark, Map as MapIcon, ChevronRight } from 'lucide-react';

// --- Data for Chhattisgarh Regions ---
const cgData = {
  overview: {
    name: "Chhattisgarh",
    subtitle: "The Rice Bowl of India",
    description: "Chhattisgarh is a heavily forested state in central India known for its temples and waterfalls. It has a rich cultural heritage, diverse tribal populations, and abundant natural resources.",
    stats: [
      { label: "Capital", value: "Raipur" },
      { label: "Districts", value: "33" },
      { label: "Formation", value: "Nov 1, 2000" }
    ],
    highlights: ["Abundant Wildlife", "Ancient Temples", "Steel Production", "Tribal Culture"]
  },
  regions: {
    surguja: {
      id: 'surguja',
      name: 'Surguja Division',
      description: 'The northernmost part of Chhattisgarh, characterized by hilly terrain, dense forests, and a rich tribal culture. It is known for its cool climate and natural beauty.',
      districts: 'Surguja, Jashpur, Koriya, Surajpur, Balrampur, Manendragarh-Chirmiri-Bharatpur',
      touristSpots: [
        { name: 'Mainpat', desc: 'Known as the "Shimla of Chhattisgarh".', icon: <Mountain size={18}/> },
        { name: 'Ramgarh', desc: 'Sita Bengra & Jogimara ancient caves.', icon: <Landmark size={18}/> },
        { name: 'Kailash Caves', desc: 'Deep caves hidden in the forests.', icon: <Trees size={18}/> }
      ],
      color: 'text-emerald-800',
      bgColor: 'bg-emerald-50'
    },
    bilaspur: {
      id: 'bilaspur',
      name: 'Bilaspur Division',
      description: 'Located in the north-central part of the state. It is known for its high-quality Kosa silk and historical significance.',
      districts: 'Bilaspur, Mungeli, Korba, Janjgir-Champa, Raigarh, Gaurela-Pendra-Marwahi, Sakti, Sarangarh-Bilaigarh',
      touristSpots: [
        { name: 'Ratanpur', desc: 'Mahamaya Temple, an ancient Shakti Peeth.', icon: <Landmark size={18}/> },
        { name: 'Achanakmar', desc: 'Tiger Reserve and Biosphere.', icon: <Trees size={18}/> },
        { name: 'Kanan Pendari', desc: 'Famous zoological garden.', icon: <MapPin size={18}/> }
      ],
      color: 'text-blue-800',
      bgColor: 'bg-blue-50'
    },
    durg: {
      id: 'durg',
      name: 'Durg Division',
      description: 'The industrial heartland of Chhattisgarh. It features a blend of heavy industries and significant historical and religious sites.',
      districts: 'Durg, Rajnandgaon, Balod, Bemetara, Kabirdham, Mohla-Manpur-Ambagarh Chowki, Khairagarh-Chhuikhadan-Gandai',
      touristSpots: [
        { name: 'Bhilai Steel Plant', desc: 'One of India\'s largest steel plants.', icon: <Factory size={18}/> },
        { name: 'Bhoramdeo Temple', desc: 'Known as the "Khajuraho of Chhattisgarh".', icon: <Landmark size={18}/> },
        { name: 'Maitri Bagh', desc: 'Zoo and park established by India-USSR.', icon: <Trees size={18}/> }
      ],
      color: 'text-orange-800',
      bgColor: 'bg-orange-50'
    },
    raipur: {
      id: 'raipur',
      name: 'Raipur Division',
      description: 'The central and capital region of the state. It is the administrative hub and features a mix of modern infrastructure and ancient ruins.',
      districts: 'Raipur, Dhamtari, Mahasamund, Gariaband, Baloda Bazar',
      touristSpots: [
        { name: 'Barnawapara', desc: 'Rich wildlife sanctuary.', icon: <Trees size={18}/> },
        { name: 'Jaitkham', desc: 'Girodhpuri Dham, a major pilgrimage site.', icon: <Landmark size={18}/> },
        { name: 'Sirpur', desc: 'Ancient Buddhist and Hindu archaeological sites.', icon: <Landmark size={18}/> }
      ],
      color: 'text-purple-800',
      bgColor: 'bg-purple-50'
    },
    bastar: {
      id: 'bastar',
      name: 'Bastar Division',
      description: 'The southern part of Chhattisgarh, famous worldwide for its unique tribal heritage, dense jungles, and spectacular waterfalls.',
      districts: 'Bastar, Dantewada, Kanker, Kondagaon, Narayanpur, Sukma, Bijapur',
      touristSpots: [
        { name: 'Tirathgarh Falls', desc: 'Stunning block-type waterfall in Kanger Valley.', icon: <MapPin size={18}/> },
        { name: 'Chitrakote Falls', desc: 'The "Niagara of India".', icon: <MapPin size={18}/> },
        { name: 'Danteshwari Temple', desc: 'Ancient temple in Dantewada.', icon: <Landmark size={18}/> }
      ],
      color: 'text-red-800',
      bgColor: 'bg-red-50'
    }
  }
};

export default function App() {
  const [activeRegion, setActiveRegion] = useState(null);

  const handleRegionClick = (regionId) => {
    setActiveRegion(activeRegion === regionId ? null : regionId);
  };

  // SVG Paths representing a stylized map of Chhattisgarh's 5 divisions
  const mapPaths = {
    surguja: "M 180,20 Q 250,10 280,60 Q 310,100 290,140 Q 200,150 140,120 Q 120,70 180,20 Z",
    bilaspur: "M 140,120 Q 200,150 290,140 Q 330,200 280,260 Q 150,280 110,230 Q 80,180 140,120 Z",
    durg: "M 110,230 Q 150,280 190,270 Q 200,350 170,390 Q 90,380 60,310 Q 50,260 110,230 Z",
    raipur: "M 190,270 Q 280,260 310,320 Q 330,380 260,400 Q 200,390 170,390 Q 200,350 190,270 Z",
    bastar: "M 170,390 Q 260,400 230,480 Q 200,580 150,580 Q 90,500 120,440 Q 90,380 170,390 Z"
  };

  const getPathStyles = (regionId) => {
    const isActive = activeRegion === regionId;
    const baseClasses = "transition-all duration-300 cursor-pointer stroke-white stroke-2 hover:opacity-80";
    
    // Define specific colors for each region map piece
    const colors = {
      surguja: isActive ? "fill-emerald-600" : "fill-emerald-400",
      bilaspur: isActive ? "fill-blue-600" : "fill-blue-400",
      durg: isActive ? "fill-orange-600" : "fill-orange-400",
      raipur: isActive ? "fill-purple-600" : "fill-purple-400",
      bastar: isActive ? "fill-red-600" : "fill-red-400",
    };

    return `${baseClasses} ${colors[regionId]} ${isActive ? 'drop-shadow-xl z-10' : 'drop-shadow-md'}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-emerald-800 text-white p-6 shadow-md z-10">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <MapIcon size={32} className="text-emerald-300" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Discover Chhattisgarh</h1>
            <p className="text-emerald-200 text-sm">Interactive State Map & Information Portal</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8 flex flex-col md:flex-row gap-8 items-start">
        
        {/* Left Column - Interactive Map */}
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-6 border border-slate-100 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2 text-slate-700 w-full text-center">Interactive Regional Map</h2>
          <p className="text-sm text-slate-500 mb-6 text-center">Click on a division to explore its details</p>
          
          <div className="relative w-full max-w-[400px] aspect-[2/3] bg-blue-50/50 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center p-4">
            <svg 
              viewBox="0 0 400 600" 
              className="w-full h-full drop-shadow-sm"
            >
              <g className="map-regions">
                {Object.entries(mapPaths).map(([id, path]) => (
                  <path
                    key={id}
                    d={path}
                    className={getPathStyles(id)}
                    onClick={() => handleRegionClick(id)}
                    onMouseEnter={(e) => {
                      // Optional: Add a simple tooltip logic here if needed
                    }}
                  >
                    <title>{cgData.regions[id].name}</title>
                  </path>
                ))}
              </g>

              {/* Labels overlayed on SVG */}
              <text x="210" y="80" className="text-xs font-bold fill-white pointer-events-none" textAnchor="middle">Surguja</text>
              <text x="220" y="210" className="text-xs font-bold fill-white pointer-events-none" textAnchor="middle">Bilaspur</text>
              <text x="120" y="320" className="text-xs font-bold fill-white pointer-events-none" textAnchor="middle">Durg</text>
              <text x="250" y="340" className="text-xs font-bold fill-white pointer-events-none" textAnchor="middle">Raipur</text>
              <text x="170" y="480" className="text-xs font-bold fill-white pointer-events-none" textAnchor="middle">Bastar</text>
            </svg>
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center italic">*Stylized representation of administrative divisions</p>
        </div>

        {/* Right Column - Information Panel */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          
          {/* Conditional Rendering based on Selection */}
          {!activeRegion ? (
            // Overview Panel (Shows when nothing is clicked)
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 animate-in fade-in duration-500">
              <div className="flex items-center gap-3 mb-4">
                <Info className="text-emerald-600" size={28} />
                <h2 className="text-3xl font-bold text-slate-800">{cgData.overview.name}</h2>
              </div>
              <p className="text-lg text-emerald-700 font-medium mb-4">{cgData.overview.subtitle}</p>
              <p className="text-slate-600 leading-relaxed mb-6">
                {cgData.overview.description}
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                {cgData.overview.stats.map((stat, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-slate-800">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Key Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {cgData.overview.highlights.map((item, idx) => (
                    <span key={idx} className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1.5 rounded-full font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Region Specific Panel
            <div className={`rounded-2xl shadow-lg p-8 border border-slate-100 transition-all duration-500 bg-white`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-3xl font-bold ${cgData.regions[activeRegion].color}`}>
                  {cgData.regions[activeRegion].name}
                </h2>
                <button 
                  onClick={() => setActiveRegion(null)}
                  className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-600 py-1.5 px-3 rounded-full transition-colors"
                >
                  Close X
                </button>
              </div>
              
              <div className={`p-4 rounded-xl mb-6 ${cgData.regions[activeRegion].bgColor}`}>
                <p className="text-slate-700 leading-relaxed">
                  {cgData.regions[activeRegion].description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Key Districts</h3>
                <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {cgData.regions[activeRegion].districts}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Notable Tourist Spots</h3>
                <ul className="space-y-3">
                  {cgData.regions[activeRegion].touristSpots.map((spot, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                      <div className={`p-2 rounded-lg ${cgData.regions[activeRegion].bgColor} ${cgData.regions[activeRegion].color}`}>
                        {spot.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{spot.name}</h4>
                        <p className="text-sm text-slate-500">{spot.desc}</p>
                      </div>
                      <ChevronRight className="ml-auto text-slate-300 self-center" size={16}/>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

