import type { CoverageReadout, IdentificationAges, IdentificationDataKind, IdentificationStudy, PosterReference } from '~/types'

// One list in this order: 1 to 4 keep the poster's numbers, transcribed from the verified poster list (gender_validation wpath_poster_production_2026/planning/references_wpath2026.md, 2026-10-23) and checked against PubMed, with Burnside cited by its 2026 print record. 5 to 17 appear only on this page, numbered in the order it cites them, from PubMed (Rich also checked in Zotero, 2026-10-24)
export const wpath2026References: PosterReference[] = [
  {
    poster: 1,
    year: 2026,
    authors: 'Becker RA, Kolli JUL, Walsh CG.',
    title: 'A scoping review of models to identify transgender patients in electronic health records',
    container: 'J Am Med Inform Assoc',
    details: '2026;33(2):472-483',
    doi: '10.1093/jamia/ocaf185',
    pmid: '41189089',
  },
  {
    poster: 2,
    year: 2026,
    authors: 'Burnside AN, Hoffmann JA, Lorenz D, Walter J, Berona J, Janssen A.',
    title: 'Development of a keyword-based search strategy to identify gender diverse youth in electronic medical records',
    container: 'Transgend Health',
    details: '2026;11(3):220-223',
    doi: '10.1089/trgh.2023.0182',
    pmid: '42170523',
  },
  {
    poster: 3,
    year: 2020,
    authors: 'Foer D, Rubins DM, Almazan A, Chan K, Bates DW, Hamnvik OR.',
    title: 'Challenges with accuracy of gender fields in identifying transgender patients in electronic health records',
    container: 'J Gen Intern Med',
    details: '2020;35(12):3724-3725',
    doi: '10.1007/s11606-019-05567-6',
    pmid: '31808128',
  },
  {
    poster: 4,
    year: 2024,
    authors: 'Beach LB, Hackenberger P, Ascha M, et al.',
    title: 'Building a cohort of transgender and nonbinary patients from the electronic medical record',
    container: 'LGBT Health',
    details: '2024;11(4):310-316',
    doi: '10.1089/lgbt.2022.0107',
    pmid: '38153365',
  },
  {
    poster: 5,
    year: 2024,
    authors: 'Kahn NF, Sequeira GM, Asante PG, et al.',
    title: 'Estimating transgender and gender-diverse youth populations in health systems and survey data',
    container: 'Pediatrics',
    details: '2024;153(6):e2023065197',
    doi: '10.1542/peds.2023-065197',
    pmid: '38752289',
  },
  {
    poster: 6,
    year: 2021,
    authors: 'Chyten-Brennan J, Patel VV, Ginsberg MS, Hanna DB.',
    title: 'Algorithm to identify transgender and gender nonbinary individuals among people living with HIV performs differently by age and ethnicity',
    container: 'Ann Epidemiol',
    details: '2021;54:73-78',
    doi: '10.1016/j.annepidem.2020.09.013',
    pmid: '33010416',
  },
  {
    poster: 7,
    year: 2016,
    authors: 'Roblin D, Barzilay J, Tolsma D, et al.',
    title: 'A novel method for estimating transgender status using electronic medical records',
    container: 'Ann Epidemiol',
    details: '2016;26(3):198-203',
    doi: '10.1016/j.annepidem.2016.01.004',
    pmid: '26907539',
  },
  {
    poster: 8,
    year: 2017,
    authors: 'Quinn VP, Nash R, Hunkeler E, et al.',
    title: 'Cohort profile: Study of Transition, Outcomes and Gender (STRONG) to assess health status of transgender people',
    container: 'BMJ Open',
    details: '2017;7(12):e018121',
    doi: '10.1136/bmjopen-2017-018121',
    pmid: '29284718',
  },
  {
    poster: 9,
    year: 2019,
    authors: 'Ehrenfeld JM, Gottlieb KG, Beach LB, Monahan SE, Fabbri D.',
    title: 'Development of a natural language processing algorithm to identify and evaluate transgender patients in electronic health record systems',
    container: 'Ethn Dis',
    details: '2019;29(Suppl 2):441-450',
    doi: '10.18865/ed.29.S2.441',
    pmid: '31308617',
  },
  {
    poster: 10,
    year: 2020,
    authors: 'Guo Y, He X, Lyu T, et al.',
    title: 'Developing and validating a computable phenotype for the identification of transgender and gender nonconforming individuals and subgroups',
    container: 'AMIA Annu Symp Proc',
    details: '2020;2020:514-523',
    pmid: '33936425',
  },
  {
    poster: 11,
    year: 2021,
    authors: 'Alpert AB, Komatsoulis GA, Meersman SC, et al.',
    title: 'Identification of transgender people with cancer in electronic health records: recommendations based on CancerLinQ observations',
    container: 'JCO Oncol Pract',
    details: '2021;17(3):e336-e342',
    doi: '10.1200/OP.20.00634',
    pmid: '33705680',
  },
  {
    poster: 12,
    year: 2021,
    authors: 'Rich AJ, Poteat T, Koehoorn M, et al.',
    title: 'Development of a computable phenotype to identify a transgender sample for health research purposes: a feasibility study in a large linked provincial healthcare administrative cohort in British Columbia, Canada',
    container: 'BMJ Open',
    details: '2021;11(3):e040928',
    doi: '10.1136/bmjopen-2020-040928',
    pmid: '33766836',
  },
  {
    poster: 13,
    year: 2021,
    authors: 'Wolfe HL, Reisman JI, Yoon SS, et al.',
    title: 'Validating data-driven methods for identifying transgender individuals in the Veterans Health Administration of the US Department of Veterans Affairs',
    container: 'Am J Epidemiol',
    details: '2021;190(9):1928-1934',
    doi: '10.1093/aje/kwab102',
    pmid: '34467408',
  },
  {
    poster: 14,
    year: 2021,
    authors: 'Xie F, Getahun D, Quinn VP, et al.',
    title: 'An automated algorithm using free-text clinical notes to improve identification of transgender people',
    container: 'Inform Health Soc Care',
    details: '2021;46(1):18-28',
    doi: '10.1080/17538157.2020.1828890',
    pmid: '33203265',
  },
  {
    poster: 15,
    year: 2023,
    authors: 'Hua Y, Wang L, Nguyen V, et al.',
    title: 'A deep learning approach for transgender and gender diverse patient identification in electronic health records',
    container: 'J Biomed Inform',
    details: '2023;147:104507',
    doi: '10.1016/j.jbi.2023.104507',
    pmid: '37778672',
  },
  {
    poster: 16,
    year: 2023,
    authors: 'Nik-Ahd F, Waller J, De Hoedt AM, et al.',
    title: 'Seeing the unseen: how can we best identify transgender women within the Veterans Affairs healthcare system\'s electronic medical record?',
    container: 'J Sex Med',
    details: '2023;20(4):559-567',
    doi: '10.1093/jsxmed/qdac033',
    pmid: '36814112',
  },
  {
    poster: 17,
    year: 2023,
    authors: 'Streed CG, King D, Grasso C, et al.',
    title: 'Validation of an administrative algorithm for transgender and gender diverse persons against self-report data in electronic health records',
    container: 'J Am Med Inform Assoc',
    details: '2023;30(6):1047-1055',
    doi: '10.1093/jamia/ocad039',
    pmid: '36921287',
  },
]

// The 14 studies of the Becker 2026 review plus Burnside 2026, the youth study that checked its result. Kinds follow Becker's Table 2 and its text (Burnside classified here); ages come from each paper; years are print years as cited
export const wpath2026Studies: IdentificationStudy[] = [
  { ref: 7, name: 'Roblin', year: 2016, ages: 'mixed', kinds: ['codesWithOther', 'noteText', 'codedWithNotes'] },
  { ref: 8, name: 'Quinn', year: 2017, ages: 'mixed', kinds: ['codesWithOther', 'noteText', 'codedWithNotes'] },
  { ref: 9, name: 'Ehrenfeld', year: 2019, ages: 'mixed', kinds: ['codedWithNotes'] },
  { ref: 3, name: 'Foer', year: 2020, ages: 'unreported', kinds: ['codedWithNotes'] },
  { ref: 10, name: 'Guo', year: 2020, ages: 'mixed', kinds: ['codesWithOther', 'codedWithNotes'] },
  { ref: 11, name: 'Alpert', year: 2021, ages: 'unreported', kinds: ['codes', 'otherCoded'] },
  { ref: 6, name: 'Chyten-Brennan', year: 2021, ages: 'unreported', kinds: ['codes', 'otherCoded', 'noteText', 'codedWithNotes'] },
  { ref: 12, name: 'Rich', year: 2021, ages: 'adults', kinds: ['codes', 'codesWithOther'] },
  { ref: 13, name: 'Wolfe', year: 2021, ages: 'adults', kinds: ['codes', 'otherCoded'] },
  { ref: 14, name: 'Xie', year: 2021, ages: 'unreported', kinds: ['noteText'] },
  { ref: 15, name: 'Hua', year: 2023, ages: 'adults', kinds: ['noteText', 'codedWithNotes'] },
  { ref: 16, name: 'Nik-Ahd', year: 2023, ages: 'adults', kinds: ['codes', 'codesWithOther'] },
  { ref: 17, name: 'Streed', year: 2023, ages: 'adults', kinds: ['codesWithOther'] },
  { ref: 4, name: 'Beach', year: 2024, ages: 'unreported', kinds: ['codes', 'otherCoded', 'noteText'] },
  { ref: 2, name: 'Burnside', year: 2026, ages: 'youth', kinds: ['codedWithNotes'] },
]

// The year slider's ends are the studies' own span
export const wpath2026YearFrom = Math.min(...wpath2026Studies.map((study) => study.year))
export const wpath2026YearTo = Math.max(...wpath2026Studies.map((study) => study.year))

export const wpath2026QuiltSummary = 'Five data source columns (three single-source, two multi-source) by four age groups. The 14 studies of a 2026 review fill the adult, mixed-age and unclear-age rows; none was limited to youth. One later youth study is multi-source. This study, in TGD adolescents, is also multi-source. A slider by print year shows studies arriving from 2016 to 2026.'

export const wpath2026QuiltIntro = 'Drag the slider or select a cell to view the studies.'

const REVIEW_AGES: IdentificationAges[] = ['adults', 'mixed', 'unreported']
const MULTI_SOURCE_KINDS: IdentificationDataKind[] = ['codesWithOther', 'codedWithNotes']
const REVIEW_REFERENCE = 1
const NUMBER_WORDS = ['none', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']

const reviewStudies = wpath2026Studies.filter((study) => REVIEW_AGES.includes(study.ages))
const youthStudies = wpath2026Studies.filter((study) => study.ages === 'youth')
const studyCount = (count: number) => `${count} ${count === 1 ? 'study' : 'studies'}`

export function wpath2026JoinWords(words: string[]): string {
  return words.length > 1 ? `${words.slice(0, -1).join(', ')} and ${words.at(-1)}` : (words[0] ?? '')
}

export function wpath2026StudiesBy(year: number): IdentificationStudy[] {
  return wpath2026Studies.filter((study) => study.year <= year)
}

// The live text for one slider year, always in one shape: the studies printed that year, the running total, how many were limited to youth. The review's last year cites the review and the last year cites the youth study, each beside its own claim so no superscript runs into a number
export function wpath2026YearReadout(year: number): CoverageReadout {
  const arrived = wpath2026Studies.filter((study) => study.year === year).map((study) => study.name)
  const names = arrived.length ? wpath2026JoinWords(arrived) : 'no new studies'
  const total = wpath2026StudiesBy(year).length
  const youthCount = wpath2026StudiesBy(year).filter((study) => study.ages === 'youth').length
  const youth = NUMBER_WORDS[youthCount] ?? String(youthCount)
  if (year === wpath2026YearTo) {
    return { lead: `${year}:`, text: ` ${names}. ${studyCount(total)} in all; ${youth} limited to youth.`, cite: youthStudies[0]?.ref }
  }
  if (year === Math.max(...reviewStudies.map((study) => study.year)) && total === reviewStudies.length) {
    return { lead: `${year}:`, text: ` ${names}. ${studyCount(total)}, all in the 2026 review`, cite: REVIEW_REFERENCE, after: `; ${youth} limited to youth.` }
  }
  return { lead: `${year}:`, text: ` ${names}. ${studyCount(total)} by ${year}; ${youth} limited to youth.` }
}

// Copy that states a count in words is checked here against the study data, so a data change cannot leave the copy wrong; each error names the claim that no longer holds
export function wpath2026QuiltCountErrors(): string[] {
  const errors: string[] = []
  const summary = wpath2026QuiltSummary.toLowerCase()
  const expected = [`the ${reviewStudies.length} studies of a 2026 review`, `from ${wpath2026YearFrom} to ${wpath2026YearTo}`]
  errors.push(...expected.filter((phrase) => !summary.includes(phrase)))
  // The summary's "one later youth study was multi-source" and the final year's "the one study limited to youth"
  const lastArrivals = wpath2026Studies.filter((study) => study.year === wpath2026YearTo)
  const youth = youthStudies[0]
  if (!youth || youthStudies.length !== 1 || lastArrivals.length !== 1 || lastArrivals[0] !== youth || !youth.kinds.every((kind) => MULTI_SOURCE_KINDS.includes(kind))) {
    errors.push(`exactly one study limited to youth, multi-source and alone in ${wpath2026YearTo}`)
  }
  return errors
}

