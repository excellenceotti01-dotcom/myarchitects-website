import aerialCity01 from "../assets/images/Aeris/01.png";
import aerialCity02 from "../assets/images/Aeris/02.png";
import aerialCity03 from "../assets/images/Aeris/03.png";
import aerialCity04 from "../assets/images/Aeris/04.png";
import aerialCity05 from "../assets/images/Aeris/05.png";
import aerialCity06 from "../assets/images/Aeris/06.png";
import aerialCity07 from "../assets/images/Aeris/07.png";
import westCliffConservatory01 from "../assets/images/Westcliff/conservatory 01.png";
import westCliffConservatory02 from "../assets/images/Westcliff/conservatory 02.png";
import westCliffEatery01 from "../assets/images/Westcliff/eatery 01.png";
import westCliffEatery02 from "../assets/images/Westcliff/eatery 02.png";
import westCliffEatery03 from "../assets/images/Westcliff/eatery 03.png";
import westCliffLounge01 from "../assets/images/Westcliff/lounge 001.png";
import westCliffReception01 from "../assets/images/Westcliff/reception 01.png";
import fiveBedroom3dView from "../assets/images/5 Bedroom Apartment/3d veiw.png";
import fiveBedroomFireLounge from "../assets/images/5 Bedroom Apartment/fire place .png";
import fiveBedroomFrontView from "../assets/images/5 Bedroom Apartment/frnt veiw.png";
import fiveBedroomPool01 from "../assets/images/5 Bedroom Apartment/swimming pool 1.png";
import fiveBedroomPool02 from "../assets/images/5 Bedroom Apartment/swimming pool 2.png";
import fiveBedroomTopView01 from "../assets/images/5 Bedroom Apartment/top veiw 1.png";
import fiveBedroomTopView02 from "../assets/images/5 Bedroom Apartment/top veiw 2.png";
import renovationExt01 from "../assets/images/Residential Renovation/ext1.png";
import renovationExt02 from "../assets/images/Residential Renovation/ext2.png";
import renovationKitchen01 from "../assets/images/Residential Renovation/kitchen 01.png";
import renovationLiving01 from "../assets/images/Residential Renovation/living room 01.png";
import renovationLiving02 from "../assets/images/Residential Renovation/living room 02.png";
import renovationBedroom01 from "../assets/images/Residential Renovation/bedroom 01.png";
import renovationBathroom01 from "../assets/images/Residential Renovation/bathroom01.png";
import eventCenter01 from "../assets/images/Event Center/001.png";
import eventCenter02 from "../assets/images/Event Center/002.png";
import eventCenter03 from "../assets/images/Event Center/003.png";
import eventCenter04 from "../assets/images/Event Center/004.png";
import eventCenter05 from "../assets/images/Event Center/005.png";
import eventCenter06 from "../assets/images/Event Center/006.png";
import eventCenter07 from "../assets/images/Event Center/007.png";
import apartment3Living01 from "../assets/images/3 Bedroom Apartment/living room 01.png";
import apartment3Living02 from "../assets/images/3 Bedroom Apartment/living room 02.png";
import apartment3Dining01 from "../assets/images/3 Bedroom Apartment/dining room 01.png";
import apartment3Dining02 from "../assets/images/3 Bedroom Apartment/dining rm 02.png";
import apartment3Kitchen01 from "../assets/images/3 Bedroom Apartment/kitchen 01.png";
import apartment3Bedroom01 from "../assets/images/3 Bedroom Apartment/bedroom 01.png";
import apartment3Bathroom01 from "../assets/images/3 Bedroom Apartment/bathroom 01.png";
import cityRender01 from "../assets/images/City Project/render.png";
import cityRender02 from "../assets/images/City Project/render 2.png";
import cityRender03 from "../assets/images/City Project/render 3.png";
import cityRender04 from "../assets/images/City Project/render 4.png";
import cityRender05 from "../assets/images/City Project/render 5.png";
import landscapeGarden01 from "../assets/images/Landscape Garden/IMG_0354.png";
import landscapeGarden02 from "../assets/images/Landscape Garden/IMG_0355.png";
import landscapeGarden03 from "../assets/images/Landscape Garden/IMG_0357.png";
import landscapeGarden04 from "../assets/images/Landscape Garden/IMG_0358.png";
import landscapeGarden05 from "../assets/images/Landscape Garden/IMG_0359.png";
import proposedGarden01 from "../assets/images/Garden 1/05.png";
import proposedGarden02 from "../assets/images/Garden 1/06.png";
import proposedGarden03 from "../assets/images/Garden 1/07.png";
import proposedGarden04 from "../assets/images/Garden 1/08.png";
import proposedGarden05 from "../assets/images/Garden 1/09.png";

export const projects = [
  {
    id: 1,
    number: "01",
    image: aerialCity05,
    title: "Aeris",
    category: "Hospitality",
    projectType: "Restroom / Toilet Design",
    location: "Lagos, Nigeria",
    status: "Completed",
    year: "2026",
    siteArea: "420 sqm",
    slug: "/work/aeris",
    alt: "Aeris wash basin area",
    statement: "Restroom interiors shaped through warm stone, curved joinery and calm planted light.",
    statementLines: [
      "Restroom interiors",
      "shaped through warm",
      "stone, curved",
      "joinery and calm",
      "planted light.",
    ],
    brief: "Aeris arranges the washroom experience as a sequence of rounded stone surfaces, wash areas and sheltered sightlines, with planting drawing daylight into the interior.",
    designResponse: "A dark basin, curved vanity joinery and timber slats bring contrast and warmth to the wash spaces, while continuous wall and floor finishes keep the rooms clear and composed.",
    concept: {
      headline: "Restroom spaces shaped for calm, clarity and comfort.",
      headlineLines: ["Restroom spaces", "shaped for calm,", "clarity and comfort."],
      paragraph: "A curved ceiling line, stone-clad walls and a continuous vanity organise the wash area into a clear, comfortable sequence, while mirrors and recessed light extend the room's depth.",
      mainImage: aerialCity06,
      mainAlt: "Aeris curved wash basin vanity",
      detailImage: aerialCity07,
      detailAlt: "Aeris restroom privacy threshold and stone finish",
      annotations: [
        { id: "planted", label: ["TIMBER SLAT SCREEN", "DEFINES WASH AREAS"] },
        { id: "views", label: ["CURVED STONE WALL", "FRAMES THE BASINS"] },
        { id: "shaded", label: ["CONTINUOUS VANITY", "HOLDS THE BASINS"] },
        { id: "screens", label: ["STONE PARTITION", "SHAPES PRIVACY"] },
      ],
    },
    spatialExperience: {
      label: "Spatial Experience",
      headline: ["Moving", "through finish,", "light and", "privacy."],
      paragraph: "From the planted threshold to the basin wall, each view focuses on material continuity, controlled light and clear movement through the washroom interior.",
      images: [
        { image: aerialCity04, alt: "Aeris planted interior threshold" },
        { image: aerialCity01, alt: "Aeris exterior approach" },
        { image: aerialCity02, alt: "Aeris shaded entry canopy" },
        { image: aerialCity03, alt: "Aeris entrance frontage" },
      ],
    },
  },
  {
    id: 2,
    number: "02",
    image: westCliffEatery01,
    title: "Westcliffe",
    category: "Hospitality",
    heroLocation: "United Kingdom",
    location: "United Kingdom",
    status: "Completed",
    year: "2026",
    siteArea: "620 sqm",
    displayProjectNameInCredits: true,
    slug: "/work/westcliffe",
    alt: "West Cliff evening dining room",
    statement: "A hospitality interior shaped around intimate dining settings, warm timber and a glazed roof that brings the canopy above into view.",
    statementLines: [
      "A hospitality interior",
      "shaped around intimate",
      "dining settings, warm",
      "timber and a glazed",
      "roof overhead.",
    ],
    brief: "West Cliff pairs a light-filled conservatory dining room with quieter lounge and reception spaces, giving each moment of arrival, gathering and pause its own character.",
    designResponse: "Round tables, timber chairs, layered window shades and soft overhead light establish a calm rhythm across the guest spaces, while distinct furniture groupings keep circulation clear.",
    concept: {
      headline: "A dining room shaped by light, rhythm and welcome.",
      headlineLines: ["A dining room", "shaped by light,", "rhythm and welcome."],
      paragraph: "The conservatory places generously spaced tables beneath a glazed roof, using timber seating, fabric shades and a warm floor finish to make the room feel composed from day into evening.",
      mainImage: westCliffConservatory02,
      mainAlt: "West Cliff conservatory dining tables beneath a glazed roof",
      detailImage: westCliffReception01,
      detailAlt: "West Cliff reception counter framed by dark material surrounds",
      annotations: [
        { id: "planted", label: ["GLAZED ROOF", "BRINGS DAYLIGHT IN"] },
        { id: "views", label: ["TABLE SETTINGS", "CREATE GATHERING"] },
        { id: "shaded", label: ["TIMBER CHAIRS", "SOFTEN THE ROOM"] },
        { id: "screens", label: ["CURVED RECEPTION", "SETS THE ARRIVAL"] },
      ],
    },
    spatialExperience: {
      label: "Spatial Experience",
      headline: ["Moving", "from arrival", "to table and", "quiet pause."],
      paragraph: "A sequence of reception, dining and lounge views moves between focused service points and more relaxed seating, with consistent timber, soft neutrals and controlled light holding the spaces together.",
      images: [
        { image: westCliffConservatory01, alt: "West Cliff conservatory dining room in daylight" },
        { image: westCliffEatery02, alt: "West Cliff table settings and timber dining chairs" },
        { image: westCliffEatery03, alt: "West Cliff intimate dining setting" },
        { image: westCliffLounge01, alt: "West Cliff guest lounge with feature lighting" },
      ],
    },
  },
  {
    id: 3,
    number: "03",
    image: fiveBedroomFrontView,
    title: "Proposed Five-Bedroom Apartment",
    category: "Residential",
    heroLocation: "Lagos",
    location: "Lagos State",
    year: "2026",
    slug: "/work/proposed-five-bedroom-apartment",
    alt: "Five Bedroom Apartment front elevation",
    statement: "A five-bedroom apartment residence composed through glazed living edges, planted balconies and generous outdoor rooms.",
    statementLines: [
      "A five-bedroom",
      "apartment residence",
      "composed through glazed",
      "living edges, planted",
      "balconies and outdoor rooms.",
    ],
    brief: "The front elevation layers open living spaces behind full-height glazing, with planted balcony edges and a stepped forecourt giving the residence a measured transition from street to home.",
    designResponse: "A clear vertical stack, recessed dark planes and continuous glass balustrades bring shade, outlook and a strong sense of order to the apartment façade.",
    status: "Completed",
    siteArea: "780 sqm",
    displayProjectNameInCredits: true,
    concept: {
      headline: "Apartment living shaped by light, planted edges and retreat.",
      headlineLines: ["Apartment living", "shaped by light,", "planted edges and retreat."],
      paragraph: "Stacked balconies, generous glazing and planted ledges give the five-bedroom residence a layered relationship to daylight and its landscaped forecourt.",
      mainImage: fiveBedroom3dView,
      mainAlt: "Five Bedroom Apartment façade with planted balconies and glazing",
      detailImage: fiveBedroomFireLounge,
      detailAlt: "Five Bedroom Apartment sunken fire lounge and terrace",
      annotations: [
        { id: "planted", label: ["FULL-HEIGHT GLAZING", "OPENS THE LIVING FLOORS"] },
        { id: "views", label: ["PLANTED BALCONIES", "SOFTEN THE FACADE"] },
        { id: "shaded", label: ["STEPPED FORECOURT", "ORGANISES ARRIVAL"] },
        { id: "screens", label: ["SUNKEN FIRE LOUNGE", "EXTENDS EVENING LIVING"] },
      ],
    },
    spatialExperience: {
      label: "Spatial Experience",
      headline: ["Moving", "between water,", "landscape and", "home."],
      paragraph: "Pool terraces, planted edges and upper-level views form a sequence of outdoor rooms, extending the apartment experience from arrival through to quiet retreat.",
      images: [
        { image: fiveBedroomPool01, alt: "Five Bedroom Apartment aerial pool terrace" },
        { image: fiveBedroomPool02, alt: "Five Bedroom Apartment poolside seating and landscape" },
        { image: fiveBedroomTopView01, alt: "Five Bedroom Apartment upper-level aerial view" },
        { image: fiveBedroomTopView02, alt: "Five Bedroom Apartment roof and terrace plan view" },
      ],
    },
  },
  {
    id: 4,
    number: "04",
    image: renovationExt01,
    title: "Proposed Residential Renovation",
    category: "Residential",
    heroLocation: "Lagos",
    location: "Lagos State",
    year: "2026",
    slug: "/work/proposed-residential-renovation",
    alt: "Residential Renovation exterior at dusk",
    statement: "A residential renovation shaped through warm timber, framed light and rooms that open naturally into one another.",
    statementLines: ["A residential", "renovation shaped through", "warm timber, framed", "light and rooms that", "open into one another."],
    brief: "The renovation brings a calm, material-led character to the home, pairing a layered exterior with brighter shared rooms and quieter private spaces.",
    designResponse: "Timber floors, textured stone, built-in joinery and carefully placed openings give the interior a clear rhythm from kitchen to living room, bedroom and bath.",
    status: "Completed",
    siteArea: "640 sqm",
    displayProjectNameInCredits: true,
    concept: {
      headline: "A home renewed through light, texture and everyday flow.",
      headlineLines: ["A home renewed", "through light,", "texture and flow."],
      paragraph: "The renewed interior connects practical rooms with a consistent palette of warm timber, pale stone and controlled natural light.",
      mainImage: renovationExt02,
      mainAlt: "Residential Renovation layered exterior and balcony",
      detailImage: renovationLiving02,
      detailAlt: "Residential Renovation secondary living room view",
      annotations: [
        { id: "planted", label: ["LAYERED FACADE", "SETS THE ARRIVAL"] },
        { id: "views", label: ["FRAMED GLAZING", "BRINGS DAYLIGHT IN"] },
        { id: "shaded", label: ["STONE FEATURE WALL", "ANCHORS THE ROOM"] },
        { id: "screens", label: ["BUILT-IN JOINERY", "KEEPS THE LIVING EDGE CLEAR"] },
      ],
    },
    spatialExperience: {
      label: "Spatial Experience",
      headline: ["Rooms change", "as light moves", "from kitchen", "to retreat."],
      paragraph: "Each scene follows a different part of the renovation, letting the kitchen, living room, bedroom and bathroom carry their own material and spatial character.",
      images: [
        { image: renovationKitchen01, alt: "Residential Renovation kitchen with timber floor and central island" },
        { image: renovationLiving01, alt: "Residential Renovation living room with textured stone wall and generous glazing" },
        { image: renovationBedroom01, alt: "Residential Renovation bedroom interior" },
        { image: renovationBathroom01, alt: "Residential Renovation bathroom interior with integrated lighting" },
      ],
      storySlides: [
        { headline: ["A kitchen", "organised around", "light and daily rhythm."], paragraph: "Warm timber flooring, a compact central island and full-height cabinetry make the kitchen feel practical without losing its calm, residential character." },
        { headline: ["A living room", "anchored by", "texture and outlook."], paragraph: "A textured stone wall, low built-in media joinery and generous glazing give the living room a grounded centre while keeping the landscape present at the edge." },
        { headline: ["A bedroom", "held in quieter", "layers of light."], paragraph: "The bedroom shifts the palette toward softer surfaces and filtered daylight, creating a more private room within the wider renovation." },
        { headline: ["A bathroom", "finished for", "clarity and ease."], paragraph: "Stone, reflective surfaces and integrated lighting keep the bathroom precise and uncluttered, with each fixture given a clear place in the room." },
      ],
    },
  },
  {
    id: 5,
    number: "05",
    image: eventCenter01,
    title: "Event Center",
    category: "Commercial",
    heroLocation: "United Kingdom",
    location: "United Kingdom",
    projectType: "Event Center",
    status: "Completed",
    year: "2026",
    siteArea: "1,200 sqm",
    displayProjectNameInCredits: true,
    slug: "/work/event-center",
    alt: "Event Center event hall with arched windows and banquet tables",
    statement: "A civic event interior shaped around daylight, gathering and a clear ceremonial rhythm.",
    statementLines: ["A civic event", "interior shaped around", "daylight, gathering", "and a clear", "ceremonial rhythm."],
    brief: "The event center brings tall arched windows, layered curtains and long banquet tables into one bright room designed for shared occasions.",
    designResponse: "Columns, chandeliers and carefully arranged tables give the hall a strong central order while keeping circulation legible around each gathering zone.",
    concept: {
      headline: "A generous hall for gathering, ceremony and shared light.",
      headlineLines: ["A generous hall", "for gathering,", "ceremony and light."],
      paragraph: "Tall openings and soft window treatments give the event room an open, welcoming character, while repeated lighting and furniture alignments keep the large volume composed.",
      mainImage: eventCenter02,
      mainAlt: "Event Center hall framed by arched windows and curtains",
      detailImage: eventCenter03,
      detailAlt: "Event Center banquet tables beneath chandeliers",
      annotations: [
        { id: "planted", label: ["ARCHED WINDOWS", "FRAME DAYLIGHT"] },
        { id: "views", label: ["LAYERED CURTAINS", "SOFTEN THE HALL"] },
        { id: "shaded", label: ["CHANDELIER LIGHTING", "SETS THE RHYTHM"] },
        { id: "screens", label: ["BANQUET TABLES", "ORGANISE GATHERING"] },
      ],
    },
    spatialExperience: {
      label: "Spatial Experience",
      headline: ["Moving", "through light,", "gathering and", "occasion."],
      paragraph: "The sequence moves from the bright arrival edge into the central hall, where curtains, chandeliers and table settings shape a welcoming event atmosphere.",
      images: [
        { image: eventCenter04, alt: "Event Center interior with framed openings and event seating" },
        { image: eventCenter05, alt: "Event Center gathering hall with chandeliers" },
        { image: eventCenter06 ?? eventCenter03, alt: "Event Center banquet setting" },
        { image: eventCenter07 ?? eventCenter02, alt: "Event Center architectural interior" },
      ],
    },
  },
  {
    id: 6,
    number: "06",
    image: apartment3Living01,
    title: "Proposed Three-Bedroom Apartments",
    category: "Residential",
    heroLocation: "Lagos",
    location: "Lagos State",
    projectType: "Three Bedroom Apartment",
    status: "Completed",
    year: "2026",
    siteArea: "460 sqm",
    displayProjectNameInCredits: true,
    slug: "/work/proposed-three-bedroom-apartments",
    alt: "Three Bedroom Apartments living and dining interior",
    statement: "Three-bedroom apartment living composed through warm surfaces, framed light and connected rooms.",
    statementLines: ["Three-bedroom", "apartment living", "composed through warm", "surfaces, framed light", "and connected rooms."],
    brief: "The apartment brings living, dining and kitchen spaces into a connected interior, using layered finishes and carefully placed openings to support everyday movement.",
    designResponse: "Textured wall surfaces, built-in storage, soft furnishings and a detailed ceiling create a calm shared setting while keeping each zone distinct.",
    concept: {
      headline: "A connected apartment shaped for daily life and retreat.",
      headlineLines: ["A connected apartment", "shaped for daily life", "and retreat."],
      paragraph: "The shared rooms are organised as a sequence of living, dining and kitchen moments, held together by warm materials, clear sightlines and controlled daylight.",
      mainImage: apartment3Living02,
      mainAlt: "Three Bedroom Apartments living room with textured feature wall",
      detailImage: apartment3Dining01,
      detailAlt: "Three Bedroom Apartments dining room and layered ceiling",
      annotations: [
        { id: "planted", label: ["TEXTURED FEATURE WALL", "ANCHORS THE LIVING ROOM"] },
        { id: "views", label: ["BUILT-IN MEDIA", "KEEPS THE WALL COMPOSED"] },
        { id: "shaded", label: ["LAYERED CEILING", "DEFINES THE SHARED ZONE"] },
        { id: "screens", label: ["DINING ARRANGEMENT", "EXTENDS THE ROOM"] },
      ],
    },
    spatialExperience: {
      label: "Spatial Experience",
      headline: ["Rooms shift", "from gathering", "to quieter", "daily rituals."],
      paragraph: "The apartment story moves between shared living, kitchen preparation, bedrooms and bathrooms, allowing each room to carry a distinct level of light, texture and privacy.",
      images: [
        { image: apartment3Kitchen01, alt: "Three Bedroom Apartments kitchen interior" },
        { image: apartment3Bedroom01, alt: "Three Bedroom Apartments bedroom interior" },
        { image: apartment3Bathroom01, alt: "Three Bedroom Apartments bathroom interior" },
        { image: apartment3Dining02, alt: "Three Bedroom Apartments secondary dining interior" },
      ],
      storySlides: [
        { headline: ["A kitchen", "organised for", "daily rhythm."], paragraph: "The kitchen keeps preparation close to the living spaces, with a clear arrangement of work surfaces, storage and light." },
        { headline: ["A bedroom", "held in", "quiet layers."], paragraph: "Softer finishes and filtered daylight give the bedroom a more private character within the connected apartment." },
        { headline: ["A bathroom", "finished for", "clarity and ease."], paragraph: "Fixtures, reflective surfaces and controlled light give the bathroom a precise, uncluttered atmosphere." },
        { headline: ["A dining room", "that keeps", "gathering close."], paragraph: "The dining setting extends the shared living sequence, with furniture and ceiling detail giving the room a clear centre." },
      ],
    },
  },
  {
    id: 7,
    number: "07",
    image: cityRender01,
    title: "City Project",
    category: "Commercial",
    heroLocation: "Lagos",
    location: "Lagos, Nigeria",
    projectType: "Mixed-use Development",
    status: "Completed",
    year: "2026",
    siteArea: "2,400 sqm",
    displayProjectNameInCredits: true,
    slug: "/work/city-project",
    alt: "City Project brick and glass street elevation",
    statement: "A city project shaped through clear edges, durable façades and a measured relationship to the street.",
    statementLines: ["A city project", "shaped through clear", "edges, durable façades", "and a measured", "street relationship."],
    brief: "Brick, glazing and planted edges give the project a legible public face, balancing solid wall planes with generous openings and a clear entrance sequence.",
    designResponse: "The architecture shifts between textured masonry, dark frames and landscaped thresholds, creating a robust urban composition with moments of softness.",
    concept: {
      headline: "An urban frontage built from texture, rhythm and arrival.",
      headlineLines: ["An urban frontage", "built from texture,", "rhythm and arrival."],
      paragraph: "The elevations use brick, glazing and framed entrances to give the development a strong street presence while keeping movement and access easy to read.",
      mainImage: cityRender02,
      mainAlt: "City Project contemporary commercial elevation",
      detailImage: cityRender03,
      detailAlt: "City Project apartment entrance and street frontage",
      annotations: [
        { id: "planted", label: ["BRICK FACADE", "BUILDS MATERIAL DEPTH"] },
        { id: "views", label: ["VERTICAL GLAZING", "BRINGS LIGHT IN"] },
        { id: "shaded", label: ["FRAMED ENTRANCE", "MARKS ARRIVAL"] },
        { id: "screens", label: ["LANDSCAPED EDGE", "SOFTENS THE STREET"] },
      ],
    },
    spatialExperience: {
      label: "Spatial Experience",
      headline: ["Moving", "between street", "edge and", "shared ground."],
      paragraph: "Two final views follow the project from its layered frontage to the planted courtyard and roof geometry that organise movement through the wider development.",
      images: [
        { image: cityRender04, alt: "City Project aerial courtyard and roof geometry" },
        { image: cityRender05, alt: "City Project entrance frontage with balconies and planting" },
      ],
      storySlides: [
        { headline: ["A courtyard", "held between", "solid edges."], paragraph: "The overhead view makes the landscape structure legible, with planted rooms and clear paths organising the shared ground." },
        { headline: ["A frontage", "that meets", "the city."], paragraph: "Layered balconies, framed glazing and a planted threshold give the final street view a clear public presence." },
      ],
    },
  },
  {
    id: 8,
    number: "08",
    image: landscapeGarden01,
    title: "Proposed Landscape Garden",
    category: "Residential",
    heroLocation: "Lagos",
    location: "Lagos, Nigeria",
    projectType: "Landscape Design",
    status: "Proposed",
    year: "2026",
    siteArea: "1,000 sqm",
    displayProjectNameInCredits: true,
    slug: "/work/proposed-landscape-garden",
    alt: "Proposed Landscape Garden planting and outdoor path",
    statement: "A proposed landscape garden shaped through planting, movement and outdoor rooms.",
    statementLines: ["A proposed", "landscape garden", "shaped through", "planting, movement", "and outdoor rooms."],
    brief: "The proposal layers planting, open lawns and defined paths into a garden sequence that moves between arrival, gathering and quieter edges.",
    designResponse: "Planting beds, clipped forms and changes in ground cover give the landscape a clear rhythm while keeping the outdoor rooms connected.",
    concept: {
      headline: "A garden proposal built from planting, shade and movement.",
      headlineLines: ["A garden proposal", "built from planting,", "shade and movement."],
      paragraph: "The landscape is organised as a sequence of planted thresholds and open clearings, using texture and canopy to shape the experience across the site.",
      mainImage: landscapeGarden02,
      mainAlt: "Proposed Landscape Garden planted outdoor room",
      detailImage: landscapeGarden03,
      detailAlt: "Proposed Landscape Garden planting detail and path edge",
      annotations: [
        { id: "planted", label: ["LAYERED PLANTING", "BUILDS DEPTH"] },
        { id: "views", label: ["GARDEN PATH", "GUIDES MOVEMENT"] },
        { id: "shaded", label: ["OPEN LAWN", "CREATES A CLEARING"] },
        { id: "screens", label: ["PLANTED EDGE", "FRAMES THE VIEW"] },
      ],
    },
    spatialExperience: {
      label: "Spatial Experience",
      headline: ["Moving", "through planting,", "shade and", "open ground."],
      paragraph: "The garden sequence shifts between planted edges, paths and open clearings, allowing each view to carry a different degree of enclosure and release.",
      images: [
        { image: landscapeGarden04, alt: "Proposed Landscape Garden open planted clearing" },
        { image: landscapeGarden05, alt: "Proposed Landscape Garden layered planting and outdoor path" },
      ],
      storySlides: [
        { headline: ["A planted edge", "that frames", "the arrival."], paragraph: "Dense planting establishes the first threshold, giving the garden a defined edge and a measured approach." },
        { headline: ["An open room", "held in", "green layers."], paragraph: "A wider clearing opens between planted beds, creating room for pause and a longer view across the landscape." },
      ],
    },
  },
  {
    id: 9,
    number: "09",
    image: proposedGarden01,
    title: "Proposed Garden 1",
    category: "Residential",
    heroLocation: "Lagos",
    location: "Lagos, Nigeria",
    projectType: "Garden Design",
    status: "Proposed",
    year: "2026",
    siteArea: "680 sqm",
    displayProjectNameInCredits: true,
    slug: "/work/proposed-garden-1",
    alt: "Proposed Garden 1 landscape view",
    statement: "A proposed garden shaped through planted thresholds, framed views and a calm outdoor rhythm.",
    statementLines: ["A proposed garden", "shaped through planted", "thresholds, framed views", "and a calm outdoor", "rhythm."],
    brief: "The proposal brings together planting, paths and open garden rooms to create a sequence of outdoor spaces around the residence.",
    designResponse: "Contrasting planting heights, clear edges and carefully framed views give the garden structure without making the landscape feel rigid.",
    concept: {
      headline: "A garden study for clear edges, planting and pause.",
      headlineLines: ["A garden study", "for clear edges,", "planting and pause."],
      paragraph: "The landscape combines layered planting with simple paths and framed openings, creating a composed outdoor setting that remains easy to move through.",
      mainImage: proposedGarden02,
      mainAlt: "Proposed Garden 1 layered planting and walkway",
      detailImage: proposedGarden03,
      detailAlt: "Proposed Garden 1 planting and garden edge detail",
      annotations: [
        { id: "planted", label: ["LAYERED BEDS", "CREATE ENCLOSURE"] },
        { id: "views", label: ["PATH ALIGNMENT", "SETS THE ROUTE"] },
        { id: "shaded", label: ["CANOPY PLANTING", "FILTERS THE VIEW"] },
        { id: "screens", label: ["OPEN CLEARING", "MAKES ROOM TO PAUSE"] },
      ],
    },
    spatialExperience: {
      label: "Spatial Experience",
      headline: ["A garden", "revealed through", "layers of", "green and light."],
      paragraph: "Two views follow the proposed garden from its planted approach into a more open landscape room, keeping the sequence simple and legible.",
      images: [
        { image: proposedGarden04, alt: "Proposed Garden 1 planted approach" },
        { image: proposedGarden05, alt: "Proposed Garden 1 open landscape room" },
      ],
      storySlides: [
        { headline: ["A planted approach", "held in", "quiet layers."], paragraph: "The first view uses varied planting and a clear path to establish a gentle transition into the garden." },
        { headline: ["A clearing", "that opens", "the landscape."], paragraph: "The final view releases into a wider garden room where planting frames a calm, open centre." },
      ],
    },
  },
];

export const workIndexProjects = [...projects];
