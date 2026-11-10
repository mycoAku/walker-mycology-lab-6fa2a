const canvas = document.getElementById("cellCanvas");
const ctx = canvas.getContext("2d");
const cycleLabel = document.getElementById("cycle-count");
let width = 0;
let height = 0;
let tick = 0;

function resize() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = rect.width;
  height = rect.height;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function draw() {
  tick++;
  ctx.clearRect(0, 0, width, height);

  const grid = 42;
  ctx.strokeStyle = "rgba(223,247,223,.035)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += grid) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y < height; y += grid) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }

  const centerX = width * .5;
  const centerY = height * .53;
  const phase = tick * .018;
  const helixHeight = Math.min(height * .72, 430);
  const helixWidth = Math.min(width * .34, 170);

  ctx.save();
  ctx.translate(centerX, centerY);

  for (let i = 0; i <= 54; i++) {
    const progress = i / 54;
    const y = (progress - .5) * helixHeight;
    const angle = progress * Math.PI * 7.2 + phase;
    const x1 = Math.cos(angle) * helixWidth;
    const x2 = Math.cos(angle + Math.PI) * helixWidth;
    const depth1 = (Math.sin(angle) + 1) * .5;

    if (i % 3 === 0) {
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.strokeStyle = `rgba(223, 247, 223, ${.22 + Math.abs(depth1 - .5) * .3})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  for (let strand = 0; strand < 2; strand++) {
    ctx.beginPath();
    for (let i = 0; i <= 54; i++) {
      const progress = i / 54;
      const y = (progress - .5) * helixHeight;
      const angle = progress * Math.PI * 7.2 + phase + strand * Math.PI;
      const x = Math.cos(angle) * helixWidth;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = strand === 0 ? "rgba(190, 235, 181, .86)" : "rgba(140, 203, 209, .78)";
    ctx.shadowColor = strand === 0 ? "#a8c9a1" : "#8ccbd1";
    ctx.shadowBlur = 12;
    ctx.stroke();
  }
  ctx.restore();

  if (tick % 600 === 0) {
    cycleLabel.textContent = `Cycle ${String((tick / 600) % 99 + 1).padStart(2, "0")}`;
  }
  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);
resize();
draw();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  observer.observe(element);
});

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const views = {
  research: {
    kicker: "Research",
    title: "Research areas",
    items: [
      ["01", "Marine & coastal fungi", "Documenting fungal diversity and ecology in saltmarsh, intertidal, seagrass, forest, and other coastal habitats."],
      ["02", "Molecular biology", "Using molecular tools to investigate fungal identity, gene expression, evolution, and interactions."],
      ["03", "Genomics & metagenomics", "Applying genome sequencing and environmental DNA approaches to explore fungal diversity and community function."],
      ["04", "Coastal plant-fungal interactions", "Investigating fungi associated with coastal and marine plants and their ecological roles and host interactions."],
      ["05", "Fungal biodiversity", "Documenting and comparing fungal diversity across habitats to reveal patterns, distribution, and overlooked species."],
      ["06", "Fungi in agroecosystems", "Studying fungal communities and their roles across agricultural landscapes, soils, crops, and managed ecosystems."],
      ["07", "Arbuscular mycorrhizal fungi", "Investigating AMF diversity, root associations, nutrient exchange, and contributions to plant health and soil function."],
      ["08", "Lichens", "Exploring lichen diversity, ecology, symbiosis, and responses to environmental change across coastal and forest habitats."],
      ["09", "Endophytes", "Characterizing fungal endophytes in plants and investigating their ecology, diversity, and biological roles."],
      ["10", "Fungi in biocontrol", "Assessing fungal organisms and interactions for sustainable biological control in agriculture and natural systems."],
      ["11", "Bioremediation", "Investigating fungal capabilities to transform, break down, and reduce environmental contaminants."]
    ]
  },
  people: {
    kicker: "Lab Members",
    title: "Lab Members",
    items: [
      ["01", "Principal investigator", "Leadership across fungal biology, chemistry, and ecological systems."],
      ["02", "Researchers", "Graduate and postdoctoral scientists advancing independent projects."],
      ["03", "Collaborators", "A network of partners in medicine, ecology, engineering, and design."]
    ]
  },
  publications: {
    kicker: "",
    title: "Publications",
    items: [
      { year: "2026", title: "Automated methods to accelerate fungal red listing: a case study for North American macrofungi", details: "VJ Svahnström, S Bachman, C Canteiro, E Nic Lughadha, AM Ainsworth, et al. Fungal Ecology, 83:101540.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:WbkHhVStYXYC" },
      { year: "2026", title: "Assessment of the metabolic potential and transformation of aliphatic and polycyclic aromatic hydrocarbons by marine fungi from Mexican coastal and deep-sea environments", details: "J Olguin, V Solís-Weiss, G Ponce-Vélez, AV Botello, M Figueroa, et al. Marine Environmental Research, 220:108161.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:u9iWguZQMMsC" },
      { year: "2026", title: "Methylmercury and total mercury content on Usnea lichens in Nova Scotia: assessing mercury stability with controlled irradiation and temperature change", details: "NJ O’Driscoll, I Carvalho, J Canário, AK Walker, SJ Klapstein, R Keenan, et al. Bulletin of Environmental Contamination and Toxicology, 117(1):2.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:Tiz5es2fbqcC" },
      { year: "2026", title: "Arbuscular mycorrhizal fungal establishment in cordgrasses (Sporobolus spp.) at restored and natural Bay of Fundy salt marshes", details: "K Sampson, J Lundholm, D van Proosdij, A Walker. The Canadian Field-Naturalist, 139(2):115–125.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:XiSMed-E-HIC" },
      { year: "2026", title: "Using historic fungarium collections to assess macrofungal community shifts in insect-damaged eastern hemlock (Tsuga canadensis) forests", details: "RM Mader, KN Egger, O Crooks, MJ Smith, AK Walker. Fungal Ecology, 80:101494.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:SP6oXDckpogC" },
      { year: "2026", title: "Monitoring vegetation height to track environmental change and restoration trajectory in tidal wetlands", details: "JT Lundholm, KJ Williams, E Hodgson, K Sampson, JM Graham, et al. Wetlands Ecology and Management, 34(1):12.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:OU6Ihb5iCvQC" },
      { year: "2026", title: "Basidiomycete yeasts of wine grapes and their potential applications in winemaking", details: "A Bunbury-Blanchette, L Fan, A Walker, G Kernaghan. Comprehensive Reviews in Food Science and Food Safety, 24(6):e70295.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:dfsIfKJdRG4C" },
      { year: "2025", title: "Ex situ conservation of the globally imperiled Eastern Mountain Avens (Geum peckii) in Nova Scotia, Canada", details: "RD Browne, S Hines, A Belliveau, SJ Adams, JC López-Gutiérrez, K King, et al. In: Wetland Restoration for Endangered Species Recovery: A Multidisciplinary volume.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:70eg2SAEIzsC" },
      { year: "2025", title: "Foliar endophytic fungi from Geum peckii in Canada", details: "SJ Adams, BM Robicheau, D LaRue, RD Browne, AK Walker. In: Wetland Restoration for Endangered Species Recovery: A Multidisciplinary volume.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:35N4QoGY0k4C" },
      { year: "2025", title: "Class Sordariomycetes", details: "MS Killacky, SJ Adams, DP Overy, AK Walker. Aquaculture Mycology and Bacteriology, pp. 237–248.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:l7t_Zn2s7bgC" },
      { year: "2025", title: "In vitro micropropagation of critically imperiled Crocanthemum canadense (Cistaceae) and identification of endomycorrhizal symbionts", details: "K Sampson, RC Evans, R Browne, AK Walker. Plant Cell, Tissue and Organ Culture, 158(24).", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:ldfaerwXgEUC" },
      { year: "2024", title: "The power of citizen science to advance fungal conservation", details: "D Haelewaters, CA Quandt, L Bartrop, J Cazabonne, ME Crockatt, et al. Conservation Letters, 17(3):e13013.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:J_g5lzvAfSwC" },
      { year: "2024", title: "Singleton-based species names and fungal rarity: does the number really matter?", details: "J Cazabonne, AK Walker, J Lesven, D Haelewaters. IMA Fungus, 15(1):7.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:NaGl4SEjCO4C" },
      { year: "2024", title: "Planktonic marine fungi: a review", details: "X Peng, AS Amend, F Baltar, L Blanco-Bercial, E Breyer, G Burgaud, et al. Journal of Geophysical Research: Biogeosciences, 129(3):e2023JG007887.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:GnPB-g6toBAC" },
      { year: "2024", title: "The 2024 outline of fungi and fungus-like taxa", details: "KD Hyde, MT Noorabadi, V Thiyagaraja, MQ He, PR Johnston, et al. Mycosphere, 15(1).", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:D03iK_w7-QYC" },
      { year: "2024", title: "Diversity of mycorrhizal fungi in Eastern Hemlock stands will significantly change with the effects of Hemlock Woolly Adelgid infestation in southwestern Nova Scotia, Canada", details: "RM Mader, MJ Smith, KN Egger, AK Walker. Proceedings of the Nova Scotian Institute of Science, 53(1):123–141.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:BqipwSGYUEgC" },
      { year: "2023", title: "Planktonic marine fungi: a review", details: "X Peng, AS Amend, F Baltar, L Blanco-Bercial, E Breyer, G Burgaud, et al. ESS Open Archive, 2023:1103.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:2P1L_qKh6hAC" },
      { year: "2023", title: "An overview of fungal taxonomic, functional, and genetic diversity in coastal and oceanic biomes in megadiverse Mexico", details: "J Olguin, P Velez, V Solís-Weiss, A Barrios, AK Walker, G Ponce-Vélez, et al. Botanica Marina, 66(5):471–490.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:YFjsv_pBGBYC" },
      { year: "2023", title: "Diversity of fungi from marine inundated wood from the Bay of Fundy, Nova Scotia, Canada", details: "SJ Adams, AK Walker. Botanica Marina, 66(4):319–329.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:hMod-77fHWUC" },
      { year: "2023", title: "Recent progress in marine mycological research in different countries, and prospects for future developments worldwide", details: "KL Pang, EBG Jones, MA Abdel-Wahab, SJ Adams, A Alves, E Azevedo, et al. Botanica Marina, 66(4):239–269.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:blknAaTinKkC" },
      { year: "2023", title: "Global consortium for the classification of fungi and fungus-like taxa", details: "KD Hyde, MA Abdel-Wahab, J Abdollahzadeh, PD Abeywickrama, et al. Mycosphere Journal, 14(1):1960–2012.", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u3b_v4MAAAAJ&cstart=20&pagesize=80&sortby=pubdate&citation_for_view=u3b_v4MAAAAJ:O3NaXMp0MMsC" },
      { year: "2022", title: "In-depth review of the ecology of arenicolous marine fungi", details: "Patricia Velez, Allison K Walker, María C González, Sunidhi Subash S Narayanan, Akira Nakagiri. Fungal Ecology, 60:101164." },
      { year: "2022", title: "Lulworthia fundyensis Taylor, Adams, Robicheau & Walker sp. nov.", details: "Victoria A Taylor, Sarah J Adams, Brent M Robicheau, Allison K Walker. In Crous et al., Fungal Planet description sheets: 1383–1435. Persoonia—Molecular Phylogeny and Evolution of Fungi, 48:261–371." },
      { year: "2022", title: "Endophytic fungi from marine macroalgae in Nova Scotia", details: "Caryn Cooper, Allison K Walker. Northeastern Naturalist, 29(2):295–310." },
      { year: "2022", title: "Temporal diversity patterns for fungi and mites associated with decaying Sporobolus pumilus (Spartina patens) in the Minas Basin, Nova Scotia", details: "Bruce Malloch, Gavin Kernaghan, Allison K Walker. FACETS, 7(1):654–673." },
      { year: "2022", title: "Macrofungal conservation in Canada and target species for assessment: a starting point", details: "Anna Bazzicalupo, Susana C Gonçalves, Rémi Hébert, Sigrid Jakob, Alfredo Justo, Gavin Kernaghan, Renée Lebeuf, Bruce Malloch, R Greg Thorn, Allison K Walker. FACETS, 7(1):448–463." },
      { year: "2022", title: "A characterization of a cool-climate organic vineyard’s microbiome", details: "A Harrison Wright, Shawkat Ali, Zoë Migicovsky, Gavin M Douglas, Svetlana Yurgel, Adèle Bunbury-Blanchette, Jeff Franklin, Sarah J Adams, Allison K Walker. Phytobiomes Journal, 6(1):69–82." },
      { year: "2022", title: "Fungal endophytes and their role in agricultural plant protection against pests and pathogens", details: "Rachel Grabka, Tyler W d’Entremont, Sarah J Adams, Allison K Walker, Joey B Tanney, Pervaiz A Abbasi, Shawkat Ali. Plants, 11(3):1–29." },
      { year: "2021", title: "Using eDNA to confirm the identity of raptors that cast pellets", details: "Mika H Kirkhus, Rielle Hoeg, Dave Shutler, Allison K Walker. The Wilson Journal of Ornithology, 133(4):615–620." },
      { year: "2021", title: "Understanding multifunctional Bay of Fundy dykelands and tidal wetlands using ecosystem services—a baseline", details: "Kate Sherren, Kirsten Ellis, Julia A Guimond, Barret Kurylyk, Nicole LeRoux, Jeremy Lundholm, Mark L Mallory, Danika Van Proosdij, Allison K Walker, Tony M Bowron, John Brazner, Lisa Kellman, BL Turner II, Emily Wells. FACETS, 6(1):1446–1473." },
      { year: "2021", title: "Vertical zonation of some crustose lichens (Verrucariaceae) in Bay of Fundy littoral zones of Nova Scotia", details: "Cole A Vail, Allison K Walker. Northeastern Naturalist, 28(3):311–326." },
      { year: "2021", title: "Inoculating rhizome-propagated Sporobolus pumilus with a native mycorrhizal fungus increases salt marsh plant growth and survival", details: "Tyler W d’Entremont, Juan C López-Gutiérrez, Allison K Walker. FACETS, 6(1):1134–1145." },
      { year: "2021", title: "Foliar endophytic fungi from the endangered Eastern Mountain Avens (Geum peckii, Rosaceae) in Canada", details: "Sarah J Adams, Brent M Robicheau, Diane LaRue, Robin D Browne, Allison K Walker. Plants, 10(1026):1–13." },
      { year: "2021", title: "Fungal diversity and community structure from coastal and barrier island beaches in the United States Gulf of Mexico", details: "Allison K Walker, Brent M Robicheau. Scientific Reports, 11(3889):1–13." },
      { year: "2021", title: "Fine-scale temporal variation of intertidal marine fungal community structure: insights from an impacted Baja California sandy beach in Mexico", details: "Patricia Velez, Allison K Walker, Jaime Gasca-Pineda, Alejandra Barrios, Deniz Divanli, María C González, Akira Nakagiri. Marine Biodiversity, 51(6):1–15." },
      { year: "2021", title: "Fungal symbionts of endangered Crocanthemum canadense (Cistaceae) in Nova Scotia", details: "Philicity RM Byers, Rodger C Evans, Zoë Migicovsky, Allison K Walker. Botany, 99(7):403–419." },
      { year: "2021", title: "The Canadian Fungal Research Network: current challenges and future opportunities", details: "Linda C Horianopoulos, Emile Gluck-Thaler, Isabelle Benoit Gelber, Leah E Cowen, Jennifer Geddes-McAlister, Christian R Landry, Ilan S Schwartz, James A Scott, Adnane Sellam, Donald C Sheppard, Toby Spribille, Rajagopal Subramaniam, Allison K Walker, Steven D Harris, Rebecca S Shapiro, Aleeza C Gerstein. Canadian Journal of Microbiology, 67(1):13–22." },
      { year: "2020", title: "Shed Light in the DaRk LineagES of the Fungal Tree of Life—STRES", details: "Laura Selbmann, …, Allison K Walker, Jason E Stajich. Life, 10(12):1–13." },
      { year: "2021", title: "Saltmarsh rhizosphere fungal communities vary by sediment type and dominant plant species cover in Nova Scotia, Canada", details: "Tyler d’Entremont, Zoe Migicovsky, Juan C López‐Gutiérrez, Allison K Walker. Environmental Microbiology Reports, 13(4):458–463." },
      { year: "2020", title: "Evaluating out-planting success and mycorrhizal status of endangered Geum peckii Pursh (Rosaceae), the Eastern Mountain Avens, in Nova Scotia", details: "Sarah Fancy, Juan C López-Gutiérrez, Allison K Walker, Diane LaRue, Robin Browne. Proceedings of the Nova Scotian Institute of Science, 50(2):269–282." },
      { year: "2020", title: "Spatial distribution of mercury and other potentially toxic elements using epiphytic lichens in Nova Scotia", details: "Sara J Klapstein, Allison K Walker, Cardy Hallett Saunders, Robert P Cameron, John D Murimboh, Nelson J O’Driscoll. Chemosphere, 241:125064." },
      { year: "2019", title: "Diversity and keratin degrading ability of fungi isolated from Canadian Arctic marine bird feathers", details: "Brent M Robicheau, Sarah J Adams, Jennifer F Provencher, Gregory J Robertson, Mark L Mallory, Allison K Walker. Arctic, 72(4):347–359." },
      { year: "2019", title: "Development of a DNA barcoding protocol for fungal specimens from the EC Smith Herbarium (ACAD)", details: "Alexander P Young, Rodger C Evans, Ruth Newell, Allison K Walker. Northeastern Naturalist, 26(3):465–483." },
      { year: "2019", title: "Fungi in the marine environment: open questions and unsolved problems", details: "Anthony Amend, Gaetan Burgaud, Michael Cunliffe, Virginia P Edgcomb, Cassandra L Ettinger, MH Gutiérrez, Joseph Heitman, Erik FY Hom, Giuseppe Ianiri, Adam C Jones, Maiko Kagami, Kathryn T Picard, C Alisha Quandt, Seshagiri Raghukumar, Mertixell Riquelme, Jason Stajich, José Vargas-Muñiz, Allison K Walker, Oded Yarden, Amy S Gladfelter. mBio, 10(2):1–15." },
      { year: "2019", title: "The neglected marine fungi, sensu stricto, and their isolation for natural products’ discovery", details: "David P Overy, Teppo Rämä, Rylee Oosterhuis, Allison K Walker, Ka-Lai Pang. Marine Drugs, 17(1):1–20." },
      { year: "2019", title: "Occurrence and distribution of fungi in saline environments", details: "Adèle L Bunbury-Blanchette, Allison K Walker. In: Microorganisms in Saline Environments: Strategies and Functions, pp. 19–38." },
      { year: "2019", title: "Trichoderma species show biocontrol potential in dual culture and greenhouse bioassays against Fusarium basal rot of onion", details: "Adèle L Bunbury-Blanchette, Allison K Walker. Biological Control, 130:127–135." },
      { year: "2018", title: "Determining the effects of biochar and an arbuscular mycorrhizal inoculant on the growth of fowl mannagrass (Glyceria striata) (Poaceae)", details: "Sadie Moland, Brent M Robicheau, Robin Browne, Ruth Newell, Allison K Walker. FACETS, 3(1):441–454." },
      { year: "2018", title: "Examining arbuscular mycorrhizal fungi in Saltmarsh Hay (Spartina patens) and Smooth Cordgrass (Spartina alterniflora) in the Minas Basin, Nova Scotia", details: "Tyler W d’Entremont, Juan C López-Gutiérrez, Allison K Walker. Northeastern Naturalist, 25(1):72–86." },
      { year: "2017", title: "Marine fungi", details: "Allison K Walker, Patricia Vélez, María C González. Wiley Encyclopedia of Life Sciences." },
      { year: "2017", title: "The homothallic mating-type locus of the conifer needle endophyte Phialocephala scopiformis DAOMC 229536 (order Helotiales)", details: "Brent M Robicheau, Adèle L Bunbury-Blanchette, Kurt LaButti, Igor V Grigoriev, Allison K Walker. Fungal Biology, 121(12):1011–1024." },
      { year: "2017", title: "The complete mitochondrial genome of the conifer needle endophyte, Phialocephala scopiformis DAOMC 229536, confirms evolutionary division within the fungal Phialocephala fortinii s.l. – Acephala appalanata species complex", details: "Brent M Robicheau, Alexander P Young, Kurt LaButti, Igor V Grigoriev, Allison K Walker. Fungal Biology, 121(3):212–221." },
      { year: "2016", title: "Fungal diversity of marine biofilms on artificial reefs in the north-central Gulf of Mexico", details: "Amy L Salamone, Brent M Robicheau, Allison K Walker. Botanica Marina, 59(5):291–305." },
      { year: "2016", title: "‘Marine fungi’ and ‘marine-derived fungi’ in natural product chemistry research: toward a new consensual definition", details: "Ka-Lai Pang, David P Overy, EB Gareth Jones, Maria da Luz Calado, Gaëtan Burgaud, Allison K Walker, John A Johnson, Russell G Kerr, Hyo-Jung Cha, Gerald F Bills. Fungal Biology Reviews, 30(4):163–175." },
      { year: "2016", title: "Full genome of Phialocephala scopiformis DAOMC 229536, a fungal endophyte of spruce producing the potent anti-insectan compound rugulosin", details: "Allison K Walker, Samantha L Frasz, Keith A Seifert, J David Miller, Stephen J Mondo, Kurt LaButti, Anna Lipzen, Rhyan B Dockter, Megan C Kennedy, Igor V Grigoriev, Joseph W Spatafora. Genome Announcements, 4(1):1–2." },
      { year: "2015", title: "Antimicrobial dihydrobenzofurans and xanthenes from a foliar endophyte of Pinus strobus", details: "Susan N Richardson, Tienabe K Nsiama, Allison K Walker, David R McMullin, J David Miller. Phytochemistry, 117:436–443." }
    ],
    rows: true
  },
  news: {
    kicker: "News",
    title: "Lab journal.",
    items: [
      ["Featured", "Dr. Allison Walker on CBC News: Biologists seek justice for forgotten kingdom of fungi", "↗", "https://www.cbc.ca/news/science/cop17-fungi-9.7388560", "uploads/allison-walker-cbc-feature.jpg", "Dr. Allison Walker examining a sample through a microscope.", "side-by-side", null, "October 2026"],
      ["Open access", "New open access research by Rebecca Mader: ‘Using historic fungarium collections to assess macrofungal community shifts in insect-damaged eastern hemlock (<em>Tsuga canadensis</em>) forests’", "↗", "https://www.sciencedirect.com/science/article/pii/S1754504825000844", "uploads/rebecca-mader-hemlock-research.jpg", "Two researchers standing in front of a poster about macrofungal diversity in eastern hemlock forests.", "stacked-compact", null, "April 2026"],
      ["Conference", "The team attended the 6th Annual CanFunNet Fungal Biology conference - Sections on biomanufacturing and fungal potential to remove metals from mining sites", "↗", "https://canfunnet.conferences.uwo.ca/", "uploads/canfunnet-conference.png", "Illustration of a mushroom, mycelium, maple leaves, and fungal research tools.", "full-image", null, "August 2026"],
      ["Former student", "Kendra Sampson successfully completed her PhD qualifying exam and presented her research at the ECSA (Estuarine and Coastal Sciences Association) conference in Belgium.", "↗", "", "uploads/kendra-sampson-ecsa.jpg", "Kendra Sampson standing beside her research poster at a conference.", "side-by-side-compact", null, "August 2026"],
      ["Research project", "Mycaro and Acadia researchers explore a sustainable protein powder", "↗", "https://www.mycarofood.ca/", "uploads/mycaro-research.jpg", "Mycaro founder Katie McNeill and Dr. Allison Walker examining a tray of fungal protein.", "side-by-side-compact", null, "2026", true, "Created by local entrepreneur Katie McNeill, Mycaro is partnering with Dr. Allison Walker and her Acadia team to explore the protein’s commercial potential."],
      ["Archive spotlight", "2023 MSc publication: Diversity of fungi from marine inundated wood from the Bay of Fundy, Nova Scotia, Canada by Sarah J. Adams", "↗", "https://www.degruyterbrill.com/document/doi/10.1515/bot-2023-0005/html", "uploads/sarah-adams-archive.jpg", "Sarah J. Adams portrait.", "side-by-side-compact", null, "2023", false],
    ],
    rows: true
  },
  resources: {
    title: "Resources",
    items: [
      ["01", "Nova Scotia Mycological Society", "↗", "https://www.nsmycologicalsociety.org/"],
      ["02", "E.C. Smith Herbarium", "↗", "https://herbarium.acadiau.ca/home.html"],
      ["03", "K.C. Irving Environmental Science Centre and Harriet Irving Botanical Gardens", "↗", "https://kcirvingcentre.acadiau.ca/"],
      ["04", "Dr. David Malloch Mycology Webpages", "↗", "http://website.nbm-mnb.ca/mycologywebpages/MycologyWebPages.html"],
      ["05", "The Canadian Fungal Network", "↗", "https://fungalresearch.weebly.com/"],
      ["06", "LifeLabs Institute", "↗", "https://lifefabs.bio/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAVfY8ZleHRuA2FlbQIxMQBwZG9mAmZkaWQWUR_L6AkDh7IbcwtoC0LhdCWpka_v7XNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABpwURyaV7qV8tBlsxfolHM8faCdWO61N6EwBhNXI9ICrsH5utTqzih8FPxfxm_aem_-jBbCI2Okfg6gqenmI92Pg"],
      ["07", "Mycological Society of America", "↗", "https://msafungi.org/?v3=true"],
      ["08", "IUCN SSC Aquatic Fungi Specialist Group", "↗", "https://iucn.org/our-union/commissions/group/iucn-ssc-aquatic-fungi-specialist-group"]
    ],
    rows: true
  },
  contact: {
    kicker: "Contact",
    title: "Join the Team",
    items: [
      {
        label: "MSc & BSc Honours Research",
        name: "Dr. Allison Walker",
        description: "Interested in pursuing MSc or BSc Honours research in our lab? Please email Dr. Walker.",
        email: "allison.walker@acadiau.ca",
        phone: "1 (902) 585-1333",
      },
      {
        label: "Acadia Admissions",
        name: "Biology at Acadia University",
        description: "Explore the Biology program and admissions information.",
        url: "https://www2.acadiau.ca/academics/undergraduate/biology.html?v3=true",
        societyUrl: "https://www.instagram.com/acadiabiology/"
      },
      {
        label: "For any other inquiries",
        name: "Ximena Roman",
        email: "ximena.romangrajeda@acadiau.ca",
        phone: "+1 902 789 9068",
        panels: [
          { key: "instagram", label: "Lab Instagram", url: "https://www.instagram.com/walker.mlab?dlrf=ZWFseHhxY2FjbXQx", image: "uploads/instagram-logo.png", description: "Follow us on our social media to be up to date with the lab’s activities and to learn more about fungi research applications." },
          { key: "shop", label: "Lab Shop", url: "https://walkerlabmycologyshop.carrd.co/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAVfRm9leHRuA2FlbQIxMQBwZG9mAmZkaWQWUR8ngC65gGqAu5gT4ly3HVayX9ZCMXNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABpx2UDLtpBvik-y-g2ThsRK548jLnIMKfXUXy62biAZuY9MJIOoeVP-IG0WYf_aem_ap5RcRe3R82MsbmVnsqj8Q", image: "uploads/lab-shop-mushrooms.jpeg", description: "Take a look at our lab merch" }
        ],
        compact: true
      }
    ]
  }
};

const homeNewsCarousel = document.querySelector(".home-news-carousel");
const archiveSpotlights = [
  {
    label: "Research collaboration",
    title: "Nova Scotia Company Making Waves in Atlantic Canada with Acadia’s “Kelp”",
    url: "https://kcirvingcentre.acadiau.ca/research/nova-scotia-company-making-waves-in-atlantic-canada-with-acadias-kelp/",
    coverageUrl: "https://seachangebiochemistry.com/?v3=true",
    coverageLabel: "Sea Change Biochemistry",
    image: "uploads/sea-change-kelp.png",
    imageAlt: "Researchers standing beside kelp samples in a laboratory."
  },
  {
    label: "MSc publication",
    date: "2023",
    title: "Diversity of fungi from marine inundated wood from the Bay of Fundy, Nova Scotia, Canada by Sarah J. Adams",
    url: "https://www.degruyterbrill.com/document/doi/10.1515/bot-2023-0005/html",
    image: "uploads/sarah-adams-archive.jpg",
    imageAlt: "Sarah J. Adams portrait."
  },
  {
    label: "Science podcast",
    date: "June 2022",
    title: "The Roast Chook Fungi: Dr. Sally Fryar and Dr. Allison Walker on What the Duck?",
    url: "https://www.abc.net.au/listen/programs/what-the-duck/underwaterfungi/13912030",
    image: "uploads/what-the-duck.png",
    imageAlt: "The Roast Chook Fungi episode of What the Duck? on ABC Listen."
  },
  {
    label: "iNaturalist project",
    date: "2023",
    title: "MycoBlitz",
    url: "https://www.inaturalist.org/projects/summer-continental-mycoblitz-2023",
    coverageUrl: "https://www.cbc.ca/news/canada/nova-scotia/mushroom-researchers-mycoblitz-1.6939716",
    coverageLabel: "CBC Radio coverage",
    image: "uploads/inaturalist-icon.png",
    imageAlt: "iNaturalist project icon"
  },
  {
    label: "CBC Radio",
    date: "October 2024",
    title: "The importance of living collections: CBC Radio Allison Walker on fungi",
    url: "https://www.cbc.ca/news/science/fungus-biobank-1.7360805#:~:text=The%20public%20biobank%20at%20the,and%20director%20of%20the%20centre."
  },
  {
    label: "CBC Radio",
    date: "November 2021",
    title: "Passion for mushrooms mushrooming amid pandemic — CBC Radio feature with Dr. Allison Walker and Dr. Gavin Kernaghan",
    url: "https://www.cbc.ca/news/canada/nova-scotia/interest-in-mushrooms-increasing-in-nova-scotia-pandemic-1.6242718",
    image: "uploads/mushrooms-pandemic-cbc.avif",
    imageAlt: "Image accompanying CBC’s story about growing interest in mushrooms during the pandemic."
  }
];

views.news.items = siteContent.news;
archiveSpotlights.splice(0, archiveSpotlights.length, ...siteContent.archive);
views.resources.items = siteContent.resources.map(resource => [resource.number, resource.name, "↗", resource.url, resource.image]);
views.contact.items[1].url = siteContent.contacts.admissions;
views.contact.items[1].societyUrl = siteContent.contacts.society;
views.contact.items[2].panels[0].url = siteContent.contacts.instagram;
views.contact.items[2].panels[1].url = siteContent.contacts.shop;

if (homeNewsCarousel && !views.news.items.some(item => item[7] !== false)) {
  homeNewsCarousel.hidden = true;
}
if (homeNewsCarousel && views.news.items.some(item => item[7] !== false)) {
  const newsItems = views.news.items.filter(item => item[7] !== false);
  const yearElement = homeNewsCarousel.querySelector(".home-news-year");
  const slideElement = homeNewsCarousel.querySelector(".home-news-slide");
  const titleElement = homeNewsCarousel.querySelector(".home-news-story h3");
  const summaryElement = homeNewsCarousel.querySelector(".home-news-summary");
  const photoLabel = homeNewsCarousel.querySelector(".home-news-photo");
  const dotsElement = homeNewsCarousel.querySelector(".home-news-dots");
  const photoInput = homeNewsCarousel.querySelector(".home-news-photo input");
  const photoImage = homeNewsCarousel.querySelector(".home-news-photo-image");
  const photoPrompt = homeNewsCarousel.querySelector(".home-news-photo-prompt");
  const newsPhotos = newsItems.map(item => item[4] || "");
  let activeNewsIndex = 0;
  const newsDots = newsItems.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show news story ${index + 1}`);
    dot.addEventListener("click", () => showNewsStory(index));
    dotsElement.append(dot);
    return dot;
  });
  const showNewsStory = index => {
    activeNewsIndex = (index + newsItems.length) % newsItems.length;
    const [year, title, , url, , photoAlt, layout, , , , summary] = newsItems[activeNewsIndex];
    slideElement.classList.toggle("is-stacked", layout === "stacked" || layout === "stacked-compact" || layout === "full-image");
    slideElement.classList.toggle("is-compact-title", layout === "stacked-compact");
    slideElement.classList.toggle("is-full-image", layout === "full-image");
    slideElement.classList.toggle("is-side-by-side", layout === "side-by-side" || layout === "side-by-side-compact");
    slideElement.classList.toggle("is-side-by-side-compact", layout === "side-by-side-compact");
    yearElement.innerHTML = year;
    titleElement.innerHTML = url
      ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>`
      : title;
    summaryElement.innerHTML = summary || "";
    summaryElement.hidden = !summary;
    photoLabel.classList.toggle("has-photo", Boolean(newsPhotos[activeNewsIndex]));
    photoLabel.setAttribute("aria-label", `Photo for ${title}`);
    photoImage.alt = photoAlt || "";
    photoInput.setAttribute("aria-label", `Add a photo for: ${title}`);
    photoInput.value = "";
    photoImage.src = newsPhotos[activeNewsIndex];
    photoImage.hidden = !newsPhotos[activeNewsIndex];
    photoPrompt.hidden = Boolean(newsPhotos[activeNewsIndex]);
    newsDots.forEach((dot, dotIndex) => {
      dot.setAttribute("aria-pressed", String(dotIndex === activeNewsIndex));
    });
  };
  photoInput.addEventListener("change", () => {
    const [file] = photoInput.files;
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      photoInput.value = "";
      return;
    }
    if (newsPhotos[activeNewsIndex].startsWith("blob:")) URL.revokeObjectURL(newsPhotos[activeNewsIndex]);
    newsPhotos[activeNewsIndex] = URL.createObjectURL(file);
    photoImage.src = newsPhotos[activeNewsIndex];
    photoImage.hidden = false;
    photoPrompt.hidden = true;
  });
  homeNewsCarousel.querySelector(".home-news-previous").addEventListener("click", () => {
    showNewsStory(activeNewsIndex - 1);
  });
  homeNewsCarousel.querySelector(".home-news-next").addEventListener("click", () => {
    showNewsStory(activeNewsIndex + 1);
  });
  showNewsStory(activeNewsIndex);
}

const hero = document.querySelector(".hero");
const sectionView = document.getElementById("section-view");
const sectionContent = document.getElementById("section-view-content");
const sectionClose = document.querySelector(".section-close");
const footer = document.querySelector("footer");
const editorToggle = document.querySelector(".site-editor-toggle");
const editorToolbar = document.querySelector(".site-editor-toolbar");
const editableStorageKey = "walker-site-text";
let editorActive = false;

const cleanedTextKey = "walker-site-text-cleaned-v4";
try {
  localStorage.removeItem(editableStorageKey);
  localStorage.removeItem(cleanedTextKey);
} catch {
  // Storage can be unavailable in privacy-restricted contexts.
}

const editingParam = new URLSearchParams(location.search).get("editing");
try {
  if (editingParam === "1") sessionStorage.setItem("walker-editor-enabled", "1");
  if (editingParam === "0") sessionStorage.removeItem("walker-editor-enabled");
  if (sessionStorage.getItem("walker-editor-enabled") === "1") {
    document.body.classList.add("editing-enabled");
  }
} catch {
  if (editingParam === "1") document.body.classList.add("editing-enabled");
}

function editableElements(root = document) {
  const candidates = root.querySelectorAll("h1, h2, h3, h4, p, strong, small, em, a, .section-index, .view-kicker, .view-row span, .members-roster-heading, .member-role, .affiliation-upload");
  return [...candidates].filter(element =>
    !element.querySelector("h1, h2, h3, p, strong, small") &&
    !element.closest(".pi-card, .member-card, .profile-detail-section")
  );
}

function editableKey(element) {
  const all = [...document.querySelectorAll(element.tagName.toLowerCase())];
  const index = all.indexOf(element);
  return `editor:v2:${location.hash || "#home"}:${element.tagName.toLowerCase()}:${index}`;
}

function prepareEditableText(root = document) {
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(editableStorageKey) || "{}");
  } catch {
    saved = {};
  }
  let cleaned = false;
  Object.keys(saved).forEach(key => {
    if (/^editor:v2:.*:(label):/.test(key)) {
      delete saved[key];
      cleaned = true;
    }
  });
  if (cleaned) localStorage.setItem(editableStorageKey, JSON.stringify(saved));
  editableElements(root).forEach(element => {
    if (!element.dataset.editKey) element.dataset.editKey = editableKey(element);
    if (saved[element.dataset.editKey] !== undefined) element.textContent = saved[element.dataset.editKey];
  });
}


function saveEditableText() {
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(editableStorageKey) || "{}");
  } catch {
    saved = {};
  }
  editableElements().forEach(element => {
    if (element.dataset.editKey) saved[element.dataset.editKey] = element.innerText.trim();
  });
  try {
    localStorage.setItem(editableStorageKey, JSON.stringify(saved));
  } catch {
    return false;
  }
  return true;
}

function setEditorMode(active) {
  editorActive = active;
  document.body.classList.toggle("editor-mode", active);
  editorToggle.hidden = active;
  editorToggle.setAttribute("aria-expanded", String(active));
  editorToolbar.hidden = !active;
  editableElements().forEach(element => {
    element.contentEditable = active ? "true" : "false";
    element.spellcheck = active;
    element.dataset.editable = active ? "" : undefined;
  });
}

editorToggle.addEventListener("click", () => setEditorMode(true));
document.querySelector(".editor-close").addEventListener("click", () => {
  saveEditableText();
  setEditorMode(false);
});
document.addEventListener("input", event => {
  if (event.target.matches("[data-editable]")) saveEditableText();
});
document.querySelector(".editor-save").addEventListener("click", () => {
  const status = document.querySelector(".editor-save-status");
  if (status) {
    status.textContent = saveEditableText() ? "Saved in this browser" : "Could not save in this browser";
    status.classList.add("visible");
    window.setTimeout(() => status.classList.remove("visible"), 2500);
  }
});
document.querySelector(".editor-reset").addEventListener("click", () => {
  if (!window.confirm("Reset all website text to the original content?")) return;
  localStorage.removeItem(editableStorageKey);
  location.reload();
});

const memberCategories = [
  "PI",
  "Management",
  "PhD",
  "MSc",
  "Honors",
  "Undergraduate trainees",
  "Alumni",
  "Research associates"
];
const memberCategoryDisplay = category => category === "PI" ? "Principal investigator" : category;

const memberProfiles = {
  PI: [
    {
      name: "Allison K. Walker, PhD",
      role: "Principal investigator · Professor, Biology, Acadia University",
      details: `
        <div class="profile-detail-section">
          <h3>Leadership &amp; Service</h3>
          <ul class="profile-role-list">
            <li><span>Honors Program Coordinator</span>Acadia University</li>
            <li><span>Director</span><a href="https://herbarium.acadiau.ca/home.html" target="_blank" rel="noopener">E.C. Smith Herbarium</a></li>
            <li><span>Co-Editor in Chief</span><a href="https://www.journals.elsevier.com/fungal-ecology" target="_blank" rel="noopener">Fungal Ecology</a></li>
            <li><span>Vice-President</span><a href="https://www.nsmycologicalsociety.org/" target="_blank" rel="noopener">Nova Scotia Mycological Society</a></li>
            <li><span>Member</span><a href="https://iucn.org/our-union/commissions/group/iucn-ssc-aquatic-fungi-specialist-group" target="_blank" rel="noopener">IUCN Species Survival Commission – Aquatic Fungi Specialist Group</a></li>
            <li><span>Editorial Board member</span>Canadian Journal of Microbiology (2019–2024)</li>
          </ul>
        </div>
        <div class="profile-detail-section">
          <h3>Education</h3>
          <ul class="profile-timeline">
            <li><strong>PhD Coastal Sciences, Mycology</strong><span>University of Southern Mississippi · 2012</span></li>
            <li><strong>MS Coastal Sciences, Mycology</strong><span>University of Southern Mississippi · 2007</span></li>
            <li><strong>BSc Honours Botany</strong><span>University of Toronto · 2003</span></li>
          </ul>
        </div>
        <div class="profile-detail-section">
          <h3>Research Experience</h3>
          <ul class="profile-experience-list">
            <li>
              <strong>Postdoctoral Scientist</strong><time>October 2012–July 2014</time>
              <p>Department of Chemistry, Carleton University / Biodiversity (Mycology &amp; Microbiology), Agriculture &amp; Agri-Food Canada, Ottawa.</p>
              <p>Co-supervisors: Prof. J. David Miller (Carleton University) and Dr. Keith A. Seifert (AAFC Research Scientist).</p>
            </li>
            <li>
              <strong>Graduate Research Assistant</strong><time>August 2005–September 2012</time>
              <p>Department of Coastal Sciences, University of Southern Mississippi Gulf Coast Research Laboratory, Ocean Springs, Mississippi, USA.</p>
              <p>Supervisors: Dr. J. Campbell and Dr. DJ Grimes.</p>
            </li>
            <li>
              <strong>Visiting Scientist</strong><time>September 2004–July 2005</time>
              <p>USDA-ARS Systematic Mycology &amp; Botany Laboratory, Beltsville, Maryland, USA.</p>
              <p>Supervisor: Dr. M. Catherine Aime.</p>
            </li>
          </ul>
        </div>
        <section class="courses-taught-panel" aria-labelledby="courses-taught-title">
          <h3 id="courses-taught-title">Courses Taught</h3>
          <ul>
            <li><strong>BIOL 5013</strong><span>Research Methods in Biology 1</span></li>
            <li><strong>BIOL 4673</strong><span>Molecular Techniques</span></li>
            <li><strong>BIOL 3663</strong><span>Introductory Mycology</span></li>
            <li><strong>BIOL 1123</strong><span>Organisms and their Environment 2</span></li>
          </ul>
        </section>`,
      image: "uploads/allison-walker-portrait.webp",
      secondaryImage: "https://bayoffungi.wordpress.com/wp-content/uploads/2023/03/zocsewfi_400x400.jpeg?w=400",
      secondaryImageAlt: "Allison K. Walker using a microscope",
      linkedin: "https://www.linkedin.com/in/allison-k-w-a361461b/",
      labLogo: "uploads/walker-lab-logo.png",
      labLogoAlt: "Walker Lab Fungal Dream Team logo"
    }
  ],
  Management: [
    {
      name: "Ximena Roman",
      role: "Research Associate | Lab Technician | Lab Daily Operations",
      bio: "She completed her BSc in Biology at Acadia University, where her favorite subjects were microbiology and cell biology. She completed Research Topics 1 and 2 with the Fungal Dream Team, investigating marine endophytic fungi associated with South Australian seagrass tissues. She currently works in the Walker Lab as a Research Associate/Lab Technician, supporting research workflows and experimental design, instructing current students in molecular techniques, maintaining daily lab operations, and helping with social media.",
      image: "uploads/ximena-roman.jpeg",
      researchImage: "uploads/ximena-seagrass-research.jpg"
    }
  ],
  PhD: [
    {
      name: "Kendra Sampson",
      role: "PhD Candidate",
      bio: "Originally from Louisdale, Nova Scotia, Kendra studied arbuscular mycorrhizal fungi associated with the critically imperilled rockrose, <em>Crocanthemum canadense</em>, for her Honours research with the Fungal Dream Team. She continued in our lab for her MSc, completed in 2023, investigating arbuscular mycorrhizal fungi and sediment carbon densities in dominant salt-marsh <em>Sporobolus</em> (<em>Spartina</em>) species in Bay of Fundy salt marshes. Kendra is now a PhD student co-supervised by Dr. Danika van Proosdij of Saint Mary’s University and Acadia’s Dr. Allison Walker. This project is part of the NSERC RESNET.",
      image: "https://bayoffungi.wordpress.com/wp-content/uploads/2023/03/kendra-1.jpeg?w=694",
      links: [
        { label: "LinkedIn", url: "https://www.linkedin.com/in/kendra-sampson-547306157/" },
        { label: "ResearchGate", url: "https://www.researchgate.net/profile/Kendra_Sampson3" },
        { label: "K.C.I.C", url: "https://kcirvingcentre.acadiau.ca/research/assessing-arbuscular-mycorrhizal-colonization-and-rhizosphere-carbon-stocks-across-a-chronosequence-of-restored-and-reference-salt-marshes-in-the-bay-of-fundy-nova-scotia/?v3=true" }
      ],
      courses: [
        ["BIOL 1110L", "Organisms and Their Environment 1 Laboratory"],
        ["BIOL 1860L", "Applied Human Biology 2 Laboratory"],
        ["BIOL 2010L", "Cell and Molecular Biology Laboratory"]
      ]
    }
  ],
  MSc: [
    {
      name: "Clara Ryan",
      role: "MSc student · Corner Brook, Newfoundland",
      bio: "Co-supervised with Dr. V. Lévesque, AAFC Kentville. Investigating a novel method for improving apple orchard soil health and carbon storage using fungi.",
      image: "https://bayoffungi.wordpress.com/wp-content/uploads/2024/11/clara-for-website.jpg?w=768"
    },
    {
      name: "Katie King",
      role: "MSc student · Fredericton, New Brunswick",
      bio: "Passionate about the conservation of native plant species in the Canadian Maritimes. She completed her honours research and volunteered as a research student in Acadia’s EC Smith Herbarium and the Acadia Seed Bank for four years. Katie’s MSc project in our lab examines the Ram’s Head Lady Slipper (<em>Cypripedium arietinum</em>), critically imperilled in Nova Scotia, and its relationship with symbiotic fungi.",
      image: "https://bayoffungi.wordpress.com/wp-content/uploads/2023/03/katie1.jpg?w=427"
    },
    {
      name: "Hope Mailman",
      role: "MSc student · Berwick, Nova Scotia",
      bio: `Hope is a former Research Topics student with the Fungal Dream Team. She worked on the identification and characterization of a novel endophytic fungus associated with the Ram’s Head Lady Slipper orchid, a project that is still ongoing.<br><br>She is currently pursuing her MSc under the co-supervision of Dr. Allison Walker at Acadia University and Dr. Shawkat Ali at the Kentville Research and Development Centre. Her research focuses on <strong>Botrytis cinerea</strong>, a pathogenic fungus that causes grey mold in more than 1,400 plant species. She is investigating biocontrol approaches, including beneficial endophytes and RNAi-based fungicides, to reduce its impact on plants. Although traditional chemical fungicides can be effective, <em>Botrytis cinerea</em> has the potential to develop resistance.<br><br>Outside the lab, Hope enjoys curling at the Berwick Curling Club and skiing at Martock in the winter, and golfing in the summer. She also enjoys reading and playing video games.<br><br>“Fun fact: I even have a Stardew Valley farm that I share online with my fellow lab mates.” —Hope`,
      image: "https://bayoffungi.wordpress.com/wp-content/uploads/2024/11/image-1.png?w=282",
      imagePosition: "center top"
    },
    {
      name: "Mareike Meents",
      role: "MSc student · Oldenburg, Germany",
      bio: "Mareike is a student from Oldenburg, Germany, who came to Acadia to complete part of her MSc research under her co-supervisor Dr. Walker. She is investigating the species composition of AMF (Arbuscular Mycorrhizal Fungi) in saltmarsh sea plantain (<em>Plantago maritima</em>) and arrowgrasses (<em>Triglochin maritima</em>) in Nova Scotia, Canada and in the North Sea, Germany.",
      image: "uploads/mareike-meents.png",
      imagePosition: "center top"
    }
  ],
  Honors: [
    {
      name: "Emma Cook",
      role: "Honours student · Truro, Nova Scotia · 2026–27",
      bio: "Emma is completing her Biology Honours with the Fungal Dream Team. She is researching the diversity of fungal endophytes in hemlock trees. Hemlock forests in Atlantic Canada are threatened by the invasive hemlock woolly adelgid, an insect that can eventually kill the trees. As a foundational species, hemlock may benefit from fungal endophytes with potential as biocontrol against this invasive insect.",
      image: "https://bayoffungi.wordpress.com/wp-content/uploads/2025/12/emmacook-for-lab-website-hons.jpeg"
    },
    {
      name: "Sydnee Brown",
      role: "Honours student · Bridgewater, Nova Scotia · 2026–27",
      bio: "Sydnee is currently doing her Biology Honours with the Fungal Dream Team and with support from Dr. Ian Spooner’s lab. She is looking at contaminants in lichens in the E.C. Smith Herbarium and in field sites that have been impacted by anthropogenic variables, such as abandoned gold mines and areas with high levels of smog in Nova Scotia, Canada.",
      image: "https://bayoffungi.wordpress.com/wp-content/uploads/2026/01/sydnee-photo-1.jpeg?w=720"
    },
    {
      name: "Mason Crouse",
      role: "Honours student",
      bio: "Mason is working on his ENVS Honors with the Fungal Dream Team. He is studying the diversity of pyrophilous fungi in Nova Scotia, that is fungi that form fruiting bodies after wildfires and are otherwise rare, undetected, or absent from the environment.",
      image: "uploads/mason-crouse.jpg"
    }
  ],
  "Undergraduate trainees": [
    {
      name: "Hannah Phillips",
      role: "Research Skills student",
      bio: "Hannah is gaining hands-on research experience at the Walker Lab, developing a diverse range of technical skills in laboratory methodologies and experimental workflows. Her training includes microscopy, DNA extraction, gel electrophoresis, and polymerase chain reaction (PCR).",
      image: "uploads/hannah-phillips.jpg",
      imagePosition: "center 22%"
    },
    {
      name: "Olivia Dixon",
      role: "Research Topics student",
      bio: "Olivia’s research topic is to investigate an endophytic fungus isolated from South Australian seagrass, with the goal of determining its species. This work advances our knowledge of the myco-communities within seagrass meadows and will contribute to the development of conservation strategies.",
      image: "uploads/olivia-dixon.jpg",
      imagePosition: "center 22%"
    }
  ],
  Alumni: [
    ["Tedi Pollak", "Honours, 2025–26", "Tedi, of Calgary, Alberta, is investigating the role of fungi in the germination and survival of culturally important Arctic lousewort plant species, co-supervised by Dr. Zoe Panchen.", "https://bayoffungi.wordpress.com/wp-content/uploads/2025/06/falls-photo.jpg?w=1010"],
    ["Sarah Doyle", "Honours, 2025–26", "Sarah, of Portugal Cove, Newfoundland, is investigating the isolation and propagation of arbuscular mycorrhizal fungi (AMF) in salt marsh sediment from the Bay of Fundy for future restoration projects, co-supervised by Kendra Sampson.", "https://bayoffungi.wordpress.com/wp-content/uploads/2025/06/sarah-d-for-labwebsite-2025.jpeg?w=1024"],
    ["Annelies Yates", "Honours, 2024–25", "Investigated fungal endophytes associated with eelgrass from field sites in British Columbia, Prince Edward Island, New Brunswick, and Nova Scotia.", "uploads/annelies-yates.jpg"],
    ["Charlotte Peng", "Honours, 2024", "Investigated non-mycorrhizal root endophytes of saltmarsh Spartina grass species; now studying law.", "uploads/charlotte-peng.webp"],
    ["Arwen Estrada Pérez", "Honours, 2024", "Arwen, of Mexico City, did Honours-Co-op thesis research in our lab on plastic biodegradation capabilities of coastal fungi.", "https://bayoffungi.wordpress.com/wp-content/uploads/2023/03/20220916_135440.jpg?w=766"],
    ["Olivia Crooks", "Honours, 2023", "Investigated changes in fungal diversity in an Eastern Hemlock plot at Kejimkujik National Park and compared current collections with historical E.C. Smith Herbarium records.", "https://bayoffungi.wordpress.com/wp-content/uploads/2023/03/olivia-1.jpg?w=1024"],
    ["Rebecca Mader", "Honours, 2022 · MSc, 2024", "Completed co-supervised Honours research on essential-oil antifungal effects and MSc research on fungi associated with Eastern Hemlock. Now Biodiversity Coordinator with the Kennebecasis Watershed Restoration Committee.", "https://bayoffungi.wordpress.com/wp-content/uploads/2023/03/img_0060.jpeg?w=720"],
    ["Maria Roy", "MSc", "Explored apple-root fungal endophytes as a biocontrol treatment for apple replant disease at AAFC Kentville, co-supervised by Dr. Shawkat Ali.", "https://bayoffungi.wordpress.com/wp-content/uploads/2023/03/maria-1.jpg?w=796", null, "center top"],
    ["Bruce Malloch", "MSc", "He completed his MSc with the Fungal Dream Team - Temporal diversity patterns for fungi and mites associated with decaying <em>Sporobolus pumilus</em> (<em>Spartina patens</em>) in the Minas Basin. Bruce was also an Arthur Irving Graduate Scholar and is now a PhD student under Dr. Greg Thorn at Western University.", "uploads/bruce-malloch.jpg", null, "center top"],
    ["Sarah Adams", "Honours · MSc · Former lab technician", "Completed MSc research on marine wood-associated fungi of the Bay of Fundy and previously investigated Geum plant endophytes.", "https://bayoffungi.wordpress.com/wp-content/uploads/2015/03/img_7247.jpg?w=750"],
    ["Tyler D’Entremont", "Honours · MSc", "Tyler, of Pubnico, Nova Scotia, investigated Spartina mycorrhizae for saltmarsh restoration for his 2016 Honours research and continued this work by completing an MSc in our lab.<br><br>Tyler is now a PhD student at the University of Tennessee, Knoxville.", "https://bayoffungi.wordpress.com/wp-content/uploads/2015/03/img_1127.jpg?w=750", null, "center top"],
    ["Adele Bunbury-Blanchette", "MSc, 2016–18", "Adele, of Annapolis Royal, Nova Scotia, conducted her MSc research (2016-2018) on <em>Fusarium</em> basal rot of onion, which threatens Nova Scotia’s onion production. Her research was supported by an NSERC CGS Masters level award. She later completed her PhD at St. Mary’s University (Halifax, NS) studying yeasts in NS vineyards.", "https://bayoffungi.wordpress.com/wp-content/uploads/2015/03/adele-1.jpg?w=750"],
    ["Jacqueline Bradbury", "Honours, 2018", "Studied biochar and mycorrhizal fungi in propagation of the rare plant Geum peckii.", "uploads/jacqueline-bradbury.webp", null, "center top"],
    ["Philicity Byers", "Honours, 2018–19", "Studied fungal associates of the rare plant <em>Crocanthemum canadense</em> for her Honours research, her research was supported by an NSERC Undergraduate Research Award.", "https://bayoffungi.wordpress.com/wp-content/uploads/2018/06/philicity.jpg?w=720", null, "center top"],
    ["John Tweedie", "Honours, 2018", "Studied fungi from a pulp mill site in NS to identify targets for mycoremediation.", "uploads/john-tweedie-dream-team-2017.jpg"],
    ["Medina Velic & Rhys Winder", "Honours, 2018", "<strong>Medina Velic</strong> (left) and <strong>Rhys Winder</strong> (right) completed their Honours research on antimicrobial growth promoters in swine and antifungal resistance in <em>Aspergillus fumigatus</em>, respectively.", "https://bayoffungi.wordpress.com/wp-content/uploads/2018/06/rhys_medina-e1529426477444.jpg?w=563"],
    ["Victoria Taylor", "Honours, 2018–19", "Victoria, of Halifax, NS, described a new obligate marine fungus from the Bay of Fundy for her Honours research. Victoria’s research was supported by an Honours Summer Research Award.", "https://bayoffungi.wordpress.com/wp-content/uploads/2018/06/victoria-taylor.jpg?w=750"],
    ["Rebecca Dodge", "Honours, 2018–19", "Studied fungi associated with the rare plant Geum peckii.", "https://bayoffungi.wordpress.com/wp-content/uploads/2018/06/becky.jpg?w=720"],
    ["Jake Reicker", "Honours, 2018–19", "Jake, of Sussex, NB, studied intertidal lignolytic mudflat fungi from the Minas Basin with the goal to identify their potential for hydrocarbon degradation.", "https://bayoffungi.wordpress.com/wp-content/uploads/2018/06/jake-r.jpg?w=750"],
    ["Cardy Saunders", "Honours, 2016", "Cardy, of Bermuda, investigated mercury content of lichens from across Nova Scotia for his 2016 Honours research, co-supervised by Dr. Allison Walker and Dr. Nelson O’Driscoll.", "https://bayoffungi.wordpress.com/wp-content/uploads/2015/03/img_1121.jpg?w=750"],
    ["Brandon Landry", "Honours", "Studied marine fungi and hydrocarbon degradation; later completed an MSc in mycology with Dr. Mary Berbee at UBC.", "https://bayoffungi.wordpress.com/wp-content/uploads/2015/03/brandon-pic2.jpg?w=461"],
    ["Alex Young", "Honours / Co-op, 2015", "Alex, of Berwick, Nova Scotia, developed a DNA barcoding protocol for Acadia’s E.C. Smith Herbarium fungal collections for his Honours/Co-op work with us in summer 2015, later published in Northeastern Naturalist. Alex then completed his MSc at STFX with Dr. R. Wyeth and is currently a PhD Student at Dalhousie University.", "https://bayoffungi.wordpress.com/wp-content/uploads/2015/03/alexlab.jpg?w=720"],
    ["Sadie Moland", "Honours, 2015", "Sadie, from Quispamsis, New Brunswick, investigated biochar-mycorrhizae interactions for native plant propagation &amp; wetland restoration during her Honours thesis work in summer 2015, later published in FACETS. Sadie’s painting of <em>Anthostomella poecila</em> ascospores is kept in the Fungal Dream Team art collection.", "https://bayoffungi.wordpress.com/wp-content/uploads/2015/03/sadie-pic2.jpg?w=750", "uploads/sadie-moland-ascospore-painting.jpeg"]
  ].map(([name, role, bio, image, artwork, imagePosition]) => ({ name, role, bio, image, artwork, imagePosition }))
};

const researchAssociateProfiles = [
  {
    name: "Ximena Roman",
    role: "Research Associate | Lab Technician | Lab Daily Operations",
    bio: "She completed her BSc in biology at Acadia University, where she was most interested in microbiology and cell biology. She is currently working in the Walker Lab as a Research Associate/Lab Technician where she collaborates with current students to instruct molecular techniques, support experimental workflows, and maintain daily lab operations.",
    image: "uploads/ximena-roman.jpeg"
  },
  {
    name: "Brent Robicheau",
    role: "Former MSc research associate · Weymouth, Nova Scotia",
    bio: "Former research associate in the lab. Brent is now a postdoctoral researcher at Clark University in the USA and will soon begin a faculty position at UPEI.",
    image: "uploads/brent-robicheau-water-collection.jpg"
  },
  {
    name: "Renaud Kaeuffer",
    role: "Coming soon",
    bio: "Coming soon."
  }
];

const formerStaffProfiles = [
  {
    name: "Sarah Adams",
    role: "Former Lab Technician",
    bio: "Completed MSc research on marine wood-associated fungi of the Bay of Fundy and previously investigated Geum plant endophytes.",
    image: "https://bayoffungi.wordpress.com/wp-content/uploads/2015/03/img_7247.jpg?w=750"
  }
];

const kendraSpecialProfile = memberProfiles.PhD.find(profile => profile.name === "Kendra Sampson");
["PhD", "MSc", "Honors", "Undergraduate trainees", "Alumni"].forEach(category => {
  memberProfiles[category] = siteContent.members
    .filter(profile => profile.category === category)
    .map(profile => profile.specialProfile === "kendra"
      ? { ...kendraSpecialProfile, ...profile }
      : profile);
});

function renderView(key) {
  const view = views[key];
  if (!view) return;
  document.querySelectorAll("main > section:not(.hero):not(.section-view)").forEach(section => {
    section.hidden = true;
  });
  hero.hidden = true;
  sectionView.hidden = false;
  footer.hidden = true;
  sectionContent.className = key === "people" ? "people-view" : key === "publications" ? "publications-view" : key === "contact" ? "contact-view" : "";
  if (key === "people") {
    sectionContent.innerHTML = `<h1 class="view-title">${view.title}</h1>
      <div class="members-directory">
        <div class="members-index" role="tablist" aria-label="Lab member categories">
          ${memberCategories.map((category, index) => `<button type="button" role="tab" data-member-category="${index}" aria-selected="${index === 0}">${memberCategoryDisplay(category)}<span>↗</span></button>`).join("")}
        </div>
        <div class="members-roster" aria-live="polite"></div>
      </div>`;
    renderMembers("0");
    sectionContent.querySelectorAll("[data-member-category]").forEach(button => {
      button.addEventListener("click", () => renderMembers(button.dataset.memberCategory));
    });
  } else if (key === "contact") {
    const traineeOptions = [
      {
        title: "Research Skills",
        description: "Introduction to laboratory or field research skills in biology with hands-on experience assisting in a research project. Skills may include trouble-shooting procedures, field work, data entry, processing samples, maintaining cultures, etc.",
        coordinator: "skills"
      },
      {
        title: "BIOL 3413 — Research Topics 1",
        description: "Laboratory or field investigations, or review of research topics in biology. Students participate in a research study which may include planning, developing suitable procedures and techniques, and/or undertaking a review or critical evaluation. Each student will write a research report and present findings.",
        coordinator: "topics"
      },
      {
        title: "BIOL 4413 — Research Topics 2",
        description: "This course consists of advanced laboratory and/or field investigations of some research topic in biology. Each student will write a research paper and present their findings. The research must be supervised or co-supervised by a faculty member in the Department of Biology.",
        coordinator: "topics"
      }
    ];
    sectionContent.innerHTML = `${view.kicker ? `<p class="view-kicker">${view.kicker}</p>` : ""}<h1 class="view-title">${view.title}</h1>
      <div class="contact-cards">${view.items.map((item, index) => `<article class="contact-card${item.compact ? " contact-card-compact" : index > 0 ? " contact-card-wide" : ""}${item.societyUrl ? " contact-admissions" : ""}">
        ${item.compact ? `<div class="contact-card-compact-main">
          <div class="contact-card-identity"><p class="contact-card-label">${item.label}</p><h2>${item.name}</h2></div>
          <div class="contact-card-links">
            ${item.email ? `<a href="mailto:${item.email}">${item.email}</a>` : ""}
            ${item.phone ? `<a href="tel:${item.phone.replace(/[^\d+]/g, "")}">${item.phone}</a>` : ""}
          </div>
        </div>
        <div class="contact-promo-panels">${item.panels.map(panel => `<article class="contact-promo-panel">
          <label class="contact-promo-photo">
            <input type="file" accept="image/*" aria-label="Add a photo for ${panel.label}">
            <img alt=""${panel.image ? ` src="${panel.image}"` : " hidden"}>
            <span${panel.image ? " hidden" : ""}>Add a photo</span>
          </label>
          <div class="contact-promo-copy">
            <h3 data-edit-key="contact:${panel.key}:title">${panel.label}</h3>
            <p data-edit-key="contact:${panel.key}:description">${panel.description || "Add a description for this panel."}</p>
            <a href="${panel.url}" target="_blank" rel="noopener noreferrer">Visit ${panel.label} <span aria-hidden="true">↗</span></a>
          </div>
        </article>`).join("")}        </div>` : item.societyUrl ? `<div class="contact-admissions-layout">
          <div class="contact-admissions-copy">
            <p class="contact-card-label">${item.label}</p><h2>${item.name}</h2>
            ${item.description ? `<p class="contact-card-description">${item.description}</p>` : ""}
            <div class="contact-card-links">
              <a href="${item.url}" target="_blank" rel="noopener noreferrer">Biology program &amp; admissions <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div class="contact-admissions-aside">
            <div class="contact-admissions-images">
              ${[1, 2].map(imageIndex => `<label class="contact-image-holder contact-image-holder-${imageIndex}">
                <input type="file" accept="image/*" aria-label="Add Acadia Biology Society image ${imageIndex}">
                ${imageIndex === 1 ? `<img src="uploads/acadia-biology-society.png" alt="Acadia Biology logo">` : imageIndex === 2 ? `<img src="uploads/acadia-biology-society-horizontal.jpeg" alt="Acadia Biology Society logo">` : `<img alt="" hidden>`}
                <span${imageIndex < 3 ? " hidden" : ""}>Add image</span>
              </label>`).join("")}
              <a class="contact-admissions-button" href="${item.societyUrl}" target="_blank" rel="noopener noreferrer">Acadia Biology Society <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>` : `<p class="contact-card-label">${item.label}</p><h2>${item.name}</h2>
          ${item.description ? `<p class="contact-card-description">${item.description}</p>` : ""}
          <div class="contact-card-links">
            ${item.email ? `<a href="mailto:${item.email}">${item.email}</a>` : ""}
            ${item.phone ? `<a href="tel:${item.phone.replace(/[^\d+]/g, "")}">${item.phone}</a>` : ""}
            ${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">Biology program &amp; admissions <span aria-hidden="true">↗</span></a>` : ""}
          </div>`}
      </article>${index === 0 ? `<aside class="contact-card contact-guidance" aria-labelledby="contact-guidance-title">
        <p class="contact-card-label">MSc &amp; BSc Honours Applications</p>
        <h2 id="contact-guidance-title">What to send</h2>
        <p class="contact-card-description">For MSc applications and, where applicable, BSc Honours applications, please include:</p>
        <ol>
          <li>A list of relevant courses you’ve taken</li>
          <li>Your research interests</li>
          <li>Why you’re a good fit</li>
          <li>A copy of your CV/Resume</li>
        </ol>
      </aside>
      <aside class="contact-card contact-trainee" aria-labelledby="contact-trainee-title">
        <p class="contact-card-label">Undergraduate Trainees</p>
        <h2 id="contact-trainee-title">Interested in being an undergraduate trainee in our lab?</h2>
        <p class="trainee-eligibility">For students already enrolled in Acadia’s Biology program</p>
        <p class="contact-card-description">Available options:</p>
        <div class="trainee-layout">
          <div class="trainee-options" role="group" aria-label="Undergraduate trainee options">
            ${traineeOptions.map((option, optionIndex) => `<button type="button" class="trainee-option" data-trainee-option="${optionIndex}" aria-pressed="${optionIndex === 0}">
              <span>${option.title}</span>
              <span>${option.description}</span>
            </button>`).join("")}
          </div>
          <div class="trainee-details" aria-live="polite">
            <section>
              <h3>What to send</h3>
              <ul>
                <li>Your research interests</li>
                <li>Relevant courses you’ve taken</li>
              </ul>
            </section>
            <section class="trainee-skills-contact" hidden>
              <h3>Research Skills contact</h3>
              <p>Dr. Allison Walker</p>
              <div class="contact-card-links">
                <a href="mailto:allison.walker@acadiau.ca">allison.walker@acadiau.ca</a>
                <a href="tel:19025851333">1 (902) 585-1333</a>
              </div>
            </section>
            <section class="trainee-topics-contact" hidden>
              <h3>Research Topics contact</h3>
              <p>Dr. Allison Walker</p>
              <div class="contact-card-links">
                <a href="mailto:allison.walker@acadiau.ca">allison.walker@acadiau.ca</a>
                <a href="tel:19025851333">1 (902) 585-1333</a>
              </div>
              <div class="trainee-secondary-coordinator">
                <h3>Research Topics coordinator</h3>
                <p>Dr. Glenys Gibson</p>
                <div class="contact-card-links">
                  <a href="mailto:glenys.gibson@acadiau.ca">glenys.gibson@acadiau.ca</a>
                  <a href="tel:19025851250">902-585-1250</a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </aside>
      <aside class="contact-card contact-card-wide contact-phd" aria-labelledby="contact-phd-title">
        <p class="contact-card-label">PhD Opportunities</p>
        <h2 id="contact-phd-title">PhD co-supervision</h2>
        <p class="contact-card-description">Acadia does not offer a PhD program in Biology, but there are opportunities for PhD co-supervision through collaboration with other universities.</p>
        <p class="contact-card-description">Please contact Dr. Allison Walker to inquire about available routes.</p>
        <h3 class="contact-phd-contact-name">Dr. Allison Walker</h3>
        <div class="contact-card-links">
          <a href="mailto:allison.walker@acadiau.ca">allison.walker@acadiau.ca</a>
          <a href="tel:19025851333">1 (902) 585-1333</a>
        </div>
      </aside>` : ""}`).join("")}</div>`;
    const traineeButtons = sectionContent.querySelectorAll("[data-trainee-option]");
      const traineeSkillsContact = sectionContent.querySelector(".trainee-skills-contact");
      const traineeTopicsContact = sectionContent.querySelector(".trainee-topics-contact");
      traineeButtons.forEach((button, optionIndex) => {
        button.addEventListener("click", () => {
          traineeButtons.forEach((optionButton, index) => {
            optionButton.setAttribute("aria-pressed", String(index === optionIndex));
          });
          const selectedOption = traineeOptions[optionIndex];
          traineeSkillsContact.hidden = selectedOption.coordinator !== "skills";
          traineeTopicsContact.hidden = selectedOption.coordinator !== "topics";
        });
      });
    traineeButtons[0]?.click();
    sectionContent.querySelectorAll(".contact-promo-photo input, .contact-image-holder input").forEach(input => {
      input.addEventListener("change", () => {
        const [file] = input.files;
        if (!file) return;
        const photo = input.closest(".contact-promo-photo, .contact-image-holder");
        const image = photo.querySelector("img");
        const prompt = photo.querySelector("span");
        if (!file.type.startsWith("image/")) {
          prompt.textContent = "Please choose an image file";
          input.value = "";
          return;
        }
        if (image.dataset.objectUrl) URL.revokeObjectURL(image.dataset.objectUrl);
        image.dataset.objectUrl = URL.createObjectURL(file);
        image.src = image.dataset.objectUrl;
        image.hidden = false;
        prompt.hidden = true;
      });
    });
  } else if (view.rows) {
    const rows = key === "publications"
      ? view.items.map(item => `<article class="view-row publication-row"><span>${item.year}</span><div class="publication-copy"><h3>${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>` : item.title}</h3><p>${item.details}</p></div></article>`).join("")
      : key === "news"
        ? view.items.filter(item => item[9] !== false).map(item => `<article class="view-row"><div class="news-row-meta"><span>${item[0]}</span>${item[8] ? `<time>${item[8]}</time>` : ""}</div><div class="news-row-copy"><h3>${item[3] ? `<a href="${item[3]}" target="_blank" rel="noopener noreferrer">${item[1]}</a>` : item[1]}</h3>${item[10] ? `<p>${item[10]}</p>` : ""}</div><strong>${item[2]}</strong></article>`).join("")
        : key === "resources"
          ? view.items.map(item => `<article class="view-row resource-row">
              <span>${item[0]}</span>
              <label class="resource-logo-placeholder">
                <input type="file" accept="image/*" aria-label="Add logo for ${item[1]}">
                ${item[4] ? `<img src="${item[4]}" alt="${item[1]} logo">` : `<img alt="" hidden><span>Add logo</span>`}
              </label>
              <h3><a href="${item[3]}" target="_blank" rel="noopener noreferrer">${item[1]}</a></h3>
              <strong>${item[2]}</strong>
            </article>`).join("")
        : view.items.map(item => `<article class="view-row"><span>${item[0]}</span><h3>${item[3] ? `<a href="${item[3]}" target="_blank" rel="noopener noreferrer">${item[1]}</a>` : item[1]}</h3><strong>${item[2]}</strong></article>`).join("");
    sectionContent.innerHTML = `${view.kicker ? `<p class="view-kicker">${view.kicker}</p>` : ""}<h1 class="view-title">${view.title}</h1>` +
      (key === "publications" ? `<a class="publications-scholar" href="https://scholar.google.com/citations?hl=en&user=u3b_v4MAAAAJ&view_op=list_works&sortby=pubdate" target="_blank" rel="noopener noreferrer">Google Scholar <span>↗</span></a>` : "") +
      rows +
      (key === "news" ? `<section class="archive-spotlights" aria-labelledby="archive-spotlights-title">
        <h2 id="archive-spotlights-title">Archive Spotlights</h2>
        <div class="archive-carousel" role="region" aria-label="Archive Spotlights">
          <div class="archive-spotlight-content" aria-live="polite"></div>
          <div class="archive-carousel-controls">
            <button type="button" class="archive-previous" aria-label="Previous archive story">←</button>
            <div class="archive-dots" role="group" aria-label="Choose an archive story"></div>
            <button type="button" class="archive-next" aria-label="Next archive story">→</button>
          </div>
        </div>
      </section>` : "");
    if (key === "news") {
      const archiveCarousel = sectionContent.querySelector(".archive-carousel");
      const archiveContent = archiveCarousel.querySelector(".archive-spotlight-content");
      const archiveDotsElement = archiveCarousel.querySelector(".archive-dots");
      const previousButton = archiveCarousel.querySelector(".archive-previous");
      const nextButton = archiveCarousel.querySelector(".archive-next");
      let activeArchiveIndex = 0;
      const archiveDots = archiveSpotlights.map((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Show archive story ${index + 1}`);
        dot.addEventListener("click", () => showArchiveStory(index));
        archiveDotsElement.append(dot);
        return dot;
      });
      const showArchiveStory = index => {
        if (!archiveSpotlights.length) {
          archiveContent.textContent = "No archive stories yet.";
          return;
        }
        activeArchiveIndex = (index + archiveSpotlights.length) % archiveSpotlights.length;
        const story = archiveSpotlights[activeArchiveIndex];
        archiveContent.innerHTML = `${story.image ? `<img src="${story.image}" alt="${story.imageAlt}">` : ""}
          <div><p>${story.label}</p>${story.date ? `<time>${story.date}</time>` : ""}<h3><a href="${story.url}" target="_blank" rel="noopener noreferrer">${story.title}</a></h3>${story.coverageUrl ? `<a class="archive-coverage-link" href="${story.coverageUrl}" target="_blank" rel="noopener noreferrer">${story.coverageLabel || "Related coverage"} ↗</a>` : ""}</div>`;
        archiveDots.forEach((dot, dotIndex) => {
          dot.setAttribute("aria-pressed", String(dotIndex === activeArchiveIndex));
        });
      };
      previousButton.disabled = archiveSpotlights.length < 2;
      nextButton.disabled = archiveSpotlights.length < 2;
      previousButton.addEventListener("click", () => showArchiveStory(activeArchiveIndex - 1));
      nextButton.addEventListener("click", () => showArchiveStory(activeArchiveIndex + 1));
      showArchiveStory(0);
    }
    if (key === "resources") {
      sectionContent.querySelectorAll(".resource-logo-placeholder input").forEach(input => {
        input.addEventListener("change", () => {
          const [file] = input.files;
          if (!file) return;
          if (!file.type.startsWith("image/")) {
            input.value = "";
            return;
          }
          const placeholder = input.closest(".resource-logo-placeholder");
          const image = placeholder.querySelector("img");
          if (image.dataset.objectUrl) URL.revokeObjectURL(image.dataset.objectUrl);
          image.dataset.objectUrl = URL.createObjectURL(file);
          image.src = image.dataset.objectUrl;
          image.hidden = false;
          placeholder.querySelector("span").hidden = true;
          placeholder.classList.add("has-logo");
        });
      });
    }
  } else {
    const researchKeywords = ["Culturing", "Microscopy", "Molecular systematics", "Phylogenetics", "DNA fingerprinting", "ITS barcoding", "PCR", "qPCR", "Genetics and genomics", "Chemistry"];
    const heading = key === "research"
      ? `<div class="research-heading"><h1 class="view-title">${view.title}</h1><div class="research-keywords" aria-label="Research methods and keywords">${researchKeywords.map(keyword => `<span>${keyword}</span>`).join("")}</div></div>`
      : `<h1 class="view-title">${view.title}</h1>`;
    sectionContent.innerHTML = `${view.kicker ? `<p class="view-kicker">${view.kicker}</p>` : ""}${heading}<div class="view-grid">` +
      view.items.map(item => `<article><span>${item[0]}</span><h3>${item[3] ? `<a href="${item[3]}" target="_blank" rel="noopener noreferrer">${item[1]}</a>` : item[1]}</h3><p>${item[2]}</p></article>`).join("") + `</div>`;
  }
  prepareEditableText();
  if (editorActive) setEditorMode(true);
  window.scrollTo(0, 0);
}

function renderMembers(categoryIndex) {
  const category = memberCategories[Number(categoryIndex)];
  const buttons = sectionContent.querySelectorAll("[data-member-category]");
  buttons.forEach(button => {
    const active = button.dataset.memberCategory === String(categoryIndex);
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active);
  });
  const roster = sectionContent.querySelector(".members-roster");
  const profiles = memberProfiles[category] || [];
  const cards = profiles.map(profile => category === "Management" ? `
    <article class="member-card management-card" data-profile-index="${profiles.indexOf(profile)}">
      <div class="management-profile-main">
        <label class="member-photo-slot management-photo-slot${profile.image ? " has-photo" : ""}"${profile.image ? ` style="--member-photo: url('${profile.image}')"` : ""}>
          <input type="file" accept="image/*" aria-label="Replace photo for ${profile.name}">
        </label>
        <div class="management-profile-copy">
          <h3>${profile.name}</h3>
          <p class="member-role">${profile.role}</p>
          <div class="management-profile-bio">${profile.bio}</div>
        </div>
      </div>
      <div class="management-profile-side">
        <label class="member-photo-slot management-media-slot${profile.researchImage ? " has-photo" : ""}"${profile.researchImage ? ` style="--member-photo: url('${profile.researchImage}')"` : ""}>
          <input type="file" accept="image/*" aria-label="Add a rectangular image for ${profile.name}">
          ${profile.researchImage ? "" : "<span>Add image</span>"}
        </label>
        <div class="management-extra-gallery" aria-label="Additional research photos">
          ${["uploads/ximena-research-01.jpeg", "uploads/ximena-research-02.jpg", "uploads/ximena-research-03.jpg", "uploads/ximena-research-04.jpg", "uploads/ximena-research-05.jpg", "uploads/ximena-research-06.jpg"].map((image, index) => `<label class="member-photo-slot management-extra-slot${image ? " has-photo" : ""}"${image ? ` style="--member-photo: url('${image}')"` : ""}>
            <input type="file" accept="image/*" aria-label="${image ? "Replace" : "Add"} additional research photo ${index + 1} for ${profile.name}">
            ${image ? "" : "<span>Add image</span>"}
          </label>`).join("")}
        </div>
        <div class="management-profile-links">
          <a href="https://www.linkedin.com/in/ximena-r-41a1b438a" target="_blank" rel="noopener noreferrer">LinkedIn<span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  ` : category === "PhD" && profile.specialProfile === "kendra" ? `
    <article class="member-card kendra-profile-card" data-profile-index="${profiles.indexOf(profile)}">
      <label class="member-photo-slot kendra-profile-photo${profile.image ? " has-photo" : ""}"${profile.image ? ` style="--member-photo: url('${profile.image}')"` : ""}>
        <input type="file" accept="image/*" aria-label="Replace photo for ${profile.name}">
      </label>
      <div class="kendra-profile-content">
        <h3>${profile.name}</h3>
        <p class="member-role">${profile.role}</p>
        <div class="kendra-profile-links">${profile.links.map(link => `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}<span aria-hidden="true">↗</span></a>`).join("")}</div>
        <p class="kendra-profile-bio">${profile.bio}</p>
      </div>
      <section class="courses-taught-panel kendra-courses-panel" aria-labelledby="kendra-courses-title">
        <h3 id="kendra-courses-title">Courses Taught</h3>
        <ul>${profile.courses.map(([code, title]) => `<li><strong>${code}</strong><span>${title}</span></li>`).join("")}</ul>
      </section>
      <div class="kendra-photo-panel" role="group" aria-label="Kendra Sampson photo gallery">
        ${["uploads/kendra-gallery-01.jpeg", "uploads/kendra-gallery-02.jpeg", "uploads/kendra-gallery-03.jpg"].map((image, index) => `<label class="member-photo-slot kendra-photo-slot has-photo" style="--member-photo: url('${image}')">
          <input type="file" accept="image/*" aria-label="Replace Kendra Sampson gallery photo ${index + 1}">
        </label>`).join("")}
      </div>
    </article>
  ` : `
    <article class="member-card${category === "PI" ? " pi-card" : ""}" data-profile-index="${profiles.indexOf(profile)}">
      <label class="member-photo-slot${category === "PI" ? " pi-photo-slot" : ""}${profile.image ? " has-photo" : ""}"${profile.image ? ` style="--member-photo: url('${profile.image}'); --member-photo-position: ${profile.imagePosition || "center center"}"` : ""}>
        <input type="file" accept="image/*" aria-label="Replace photo for ${profile.name}">
        ${category === "PI" ? "<span>Add a larger photo</span>" : ""}
      </label>
      <div class="pi-introduction">
        <h3>${profile.name}</h3>
        ${profile.credential ? `<p class="member-credential">${profile.credential}</p>` : ""}
        <p class="member-role">${profile.role}</p>
        ${profile.bio ? `<p class="pi-bio">${profile.bio}</p>` : ""}
        ${category === "PI" && profile.labLogo ? `<figure class="pi-lab-logo"><img src="${profile.labLogo}" alt="${profile.labLogoAlt || ""}"></figure>` : ""}
      </div>
      ${profile.artwork ? `<figure class="member-artwork">
        <img src="${profile.artwork}" alt="${profile.artworkAlt || ""}">
        ${profile.artworkCaption ? `<figcaption>${profile.artworkCaption}</figcaption>` : ""}
      </figure>` : ""}
      ${category === "PI" && profile.secondaryImage ? `<div class="pi-secondary-media">
        <figure class="pi-secondary-photo"><img src="${profile.secondaryImage}" alt="${profile.secondaryImageAlt || profile.name}"></figure>
        ${profile.linkedin ? `<a class="pi-linkedin-button" href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn<span aria-hidden="true">↗</span></a>` : ""}
      </div>` : ""}
      ${category === "PI" && profile.details ? `<div class="pi-profile-details">${profile.details}</div>` : ""}
    </article>
  `);
  const claraIndex = category === "MSc" ? profiles.findIndex(profile => profile.name === "Clara Ryan") : -1;
  const mareikeIndex = category === "MSc" ? profiles.findIndex(profile => profile.name === "Mareike Meents") : -1;
  const cardMarkup = claraIndex !== -1 && mareikeIndex !== -1
    ? cards.map((card, index) => index === claraIndex
      ? `<div class="members-card-stack">${card}${cards[mareikeIndex]}</div>`
      : index === mareikeIndex ? "" : card).join("")
    : cards.join("");
  roster.innerHTML = `<div class="members-roster-heading">${memberCategoryDisplay(category)}</div>` +
    (cardMarkup ? `<div class="members-roster-grid${category === "PI" ? " pi-roster-grid" : ""}" style="margin-top: 28px;">${cardMarkup}</div>` : `<div class="members-empty">${memberCategoryDisplay(category)} profiles coming soon.</div>`);
  if (category === "Management") {
    const formerStaffCards = formerStaffProfiles.map(profile => `
      <article class="member-card" data-former-staff-profile="true">
        <label class="member-photo-slot has-photo" style="--member-photo: url('${profile.image}')">
          <input type="file" accept="image/*" aria-label="Replace photo for ${profile.name}">
        </label>
        <h3>${profile.name}</h3>
        ${profile.credential ? `<p class="member-credential">${profile.credential}</p>` : ""}
        <p class="member-role">${profile.role}</p>
        <p>${profile.bio}</p>
      </article>
    `).join("");
    roster.insertAdjacentHTML("beforeend", `
      <section class="former-staff-section" aria-labelledby="former-staff-title">
        <div class="members-roster-heading">
          <h2 id="former-staff-title">Former staff</h2>
        </div>
        <div class="members-roster-grid">${formerStaffCards}</div>
      </section>
    `);
  }
  if (category === "Research associates") {
    const associateCards = researchAssociateProfiles.map(profile => `
      <article class="member-card" data-profile-index="${researchAssociateProfiles.indexOf(profile)}" data-associate-profile="true">
        <label class="member-photo-slot${profile.image ? " has-photo" : ""}"${profile.image ? ` style="--member-photo: url('${profile.image}')"` : ""}>
          <input type="file" accept="image/*" aria-label="Replace photo for ${profile.name}">
          ${profile.image ? "" : "<span>Photo coming soon</span>"}
        </label>
        <h3>${profile.name}</h3>
        <p class="member-role">${profile.role}</p>
        <p>${profile.bio}</p>
      </article>
    `).join("");
    roster.innerHTML = `<div class="members-roster-heading">${memberCategoryDisplay(category)}</div>
      <div class="members-roster-grid" style="margin-top: 28px;">${associateCards}</div>`;
  }
  if (category === "PI") {
    const piGalleryImages = [
      "uploads/allison-gallery-01.jpg",
      "uploads/allison-gallery-02.jpg",
      "uploads/allison-gallery-03.jpg",
      "uploads/allison-gallery-04.jpg",
      "uploads/allison-gallery-05.jpg",
      "uploads/allison-gallery-06.jpg",
      "uploads/allison-gallery-07.jpg",
      "uploads/allison-gallery-08.webp",
      "uploads/allison-gallery-09.jpg",
      "uploads/allison-gallery-10.webp",
      "uploads/allison-gallery-11.jpg",
      "uploads/allison-gallery-12.webp",
      "uploads/allison-gallery-13.jpg",
      "uploads/allison-gallery-14.jpg"
    ];
    roster.insertAdjacentHTML("beforeend", `
      <section class="pi-gallery" aria-labelledby="pi-gallery-title">
        <div class="pi-gallery-heading">
          <div>
            <h2 id="pi-gallery-title">Gallery</h2>
          </div>
          <p>Scroll through</p>
        </div>
        <div class="pi-gallery-track" role="list">
          ${Array.from({ length: Math.max(10, piGalleryImages.length) }, (_, index) => `
            <label class="pi-gallery-slot${piGalleryImages[index] ? " has-photo" : ""}" role="listitem"${piGalleryImages[index] ? ` style="--gallery-photo: url('${piGalleryImages[index]}')"` : ""}>
              <input type="file" accept="image/*" aria-label="Add principal investigator gallery image ${index + 1}">
              <span>${String(index + 1).padStart(2, "0")}${piGalleryImages[index] ? "" : "<small>Add image</small>"}</span>
            </label>
          `).join("")}
        </div>
      </section>
    `);
    roster.querySelectorAll(".pi-gallery-slot input").forEach(input => {
      input.addEventListener("change", () => {
        const file = input.files[0];
        if (!file || !file.type.startsWith("image/")) return;
        const slot = input.closest(".pi-gallery-slot");
        slot.style.setProperty("--gallery-photo", `url('${URL.createObjectURL(file)}')`);
        slot.classList.add("has-photo");
      });
    });
  }
  roster.querySelectorAll(".member-photo-slot input").forEach(input => {
    input.addEventListener("change", () => {
      const file = input.files[0];
      if (!file || !file.type.startsWith("image/")) return;
      const slot = input.closest(".member-photo-slot");
      slot.style.setProperty("--member-photo", `url('${URL.createObjectURL(file)}')`);
      slot.classList.add("has-photo");
    });
  });
  roster.querySelectorAll(".kendra-photo-slot input").forEach(input => {
    input.addEventListener("change", () => {
      const [file] = input.files;
      if (!file) return;
      const slot = input.closest(".kendra-photo-slot");
      const prompt = slot.querySelector("span");
      if (!file.type.startsWith("image/")) {
        input.value = "";
        return;
      }
      if (slot.dataset.objectUrl) URL.revokeObjectURL(slot.dataset.objectUrl);
      slot.dataset.objectUrl = URL.createObjectURL(file);
      slot.style.setProperty("--member-photo", `url('${slot.dataset.objectUrl}')`);
      slot.classList.add("has-photo");
      prompt.hidden = true;
    });
  });
  roster.querySelectorAll(".member-photo-slot").forEach(slot => {
    slot.removeAttribute("role");
    slot.removeAttribute("tabindex");
  });
  prepareEditableText();
  if (editorActive) setEditorMode(true);
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && document.querySelector(".member-profile-panel")) {
    document.querySelector(".member-profile-panel").remove();
    document.body.classList.remove("profile-open");
  }
});

function returnHome() {
  sectionView.hidden = true;
  hero.hidden = false;
  document.querySelectorAll("main > section:not(.hero):not(.section-view)").forEach(section => {
    section.hidden = false;
  });
  footer.hidden = false;
  history.replaceState(null, "", location.pathname);
  prepareEditableText();
  if (editorActive) setEditorMode(true);
}

function openMemberProfile(profile, category) {
  const existing = document.querySelector(".member-profile-panel");
  if (existing) existing.remove();
  const panel = document.createElement("section");
  panel.className = "member-profile-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-label", `${profile.name} profile`);
  panel.innerHTML = `
    <div class="member-profile-backdrop"></div>
    <div class="member-profile-content">
      <button class="member-profile-close" type="button" aria-label="Close profile">← <span>Back to members</span></button>
      <div class="member-profile-layout">
        <div class="member-profile-photo${profile.image ? " has-photo" : ""}"${profile.image ? ` style="--member-photo: url('${profile.image}')"` : ""}></div>
        <div class="member-profile-copy">
          <p class="view-kicker" data-edit-key="profile:${profile.name}:category">${memberCategoryDisplay(category)}</p>
          <h2 data-edit-key="profile:${profile.name}:name">${profile.name}</h2>
          <p class="member-profile-role" data-edit-key="profile:${profile.name}:role">${profile.role}</p>
          ${profile.details || ""}
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(panel);
  document.body.classList.add("profile-open");
  prepareEditableText(panel);
  if (editorActive) setEditorMode(true);
  const close = () => {
    panel.remove();
    document.body.classList.remove("profile-open");
  };
  panel.querySelector(".member-profile-close").addEventListener("click", close);
  panel.querySelector(".member-profile-backdrop").addEventListener("click", close);
}

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", event => {
    const key = link.getAttribute("href").slice(1);
    if (key === "home") {
      event.preventDefault();
      if (!sectionView.hidden) returnHome();
      window.scrollTo(0, 0);
      history.replaceState(null, "", location.pathname);
    } else if (views[key]) {
      event.preventDefault();
      renderView(key);
      history.replaceState(null, "", `#${key}`);
    }
  });
});

document.querySelectorAll(".home-directory .directory-links a, .home-quicklinks a, .home-news .text-link, .hero .text-link").forEach(link => {
  link.addEventListener("click", event => {
    const key = link.getAttribute("href").slice(1);
    if (views[key]) {
      event.preventDefault();
      renderView(key);
      history.replaceState(null, "", `#${key}`);
    }
  });
});

document.querySelectorAll('a[href="#people"]').forEach(link => {
  if (!link.closest(".main-nav") && link.closest(".people-section")) {
    link.addEventListener("click", event => {
      event.preventDefault();
      renderView("people");
      history.replaceState(null, "", "#people");
    });
  }
});
sectionClose.addEventListener("click", returnHome);
document.querySelector(".brand").addEventListener("click", event => {
  if (!sectionView.hidden) {
    event.preventDefault();
    returnHome();
  }
});

function previewAffiliation(slot, file) {
  if (!file || !file.type.startsWith("image/")) return;
  const image = slot.querySelector("img");
  image.src = URL.createObjectURL(file);
  image.hidden = false;
  slot.classList.add("has-image");
}

document.querySelectorAll(".affiliation-slot").forEach(slot => {
  const input = slot.querySelector("input");
  input.addEventListener("change", () => previewAffiliation(slot, input.files[0]));
  slot.addEventListener("dragover", event => event.preventDefault());
  slot.addEventListener("dragenter", () => slot.classList.add("dragging"));
  slot.addEventListener("dragleave", () => slot.classList.remove("dragging"));
  slot.addEventListener("drop", event => {
    event.preventDefault();
    slot.classList.remove("dragging");
    previewAffiliation(slot, event.dataTransfer.files[0]);
  });
});

prepareEditableText();
const initialSection = location.hash.slice(1);
if (initialSection === "home" || !initialSection) {
  returnHome();
} else if (views[initialSection]) {
  renderView(initialSection);
}
