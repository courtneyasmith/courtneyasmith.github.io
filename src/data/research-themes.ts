import type { ResearchDirection } from '@/types'

export const researchThemes: ResearchDirection[] = [
  {
    id: 'transgender-dermatology',
    title: 'Dermatologic Care for Transgender Patients',
    description:
      'Multi-center cohort studies characterizing acne, hidradenitis suppurativa, and hair removal outcomes in transgender individuals on gender-affirming hormone therapy.',
    focus: 'Epidemiology and clinical management in an underrepresented population',
    keyWork: ['Acne incidence and severity (JAMA Dermatology)', 'HS incidence (JAAD)'],
    relatedPublicationIds: [
      'acne-incidence-and-severity-in-transgender-individuals',
      'incidence-of-hidradenitis-suppurativa-in-transgender-and-cisgender-individuals-a',
      'permanent-hair-removal-in-gender-diverse-adults-assigned-male-at-birth-a-cross-s',
      'managing-common-dermatologic-needs-in-transgender-and-gender-diverse-adolescents',
    ],
  },
  {
    id: 'hidradenitis-suppurativa',
    title: 'Hidradenitis Suppurativa Epidemiology',
    description:
      'Population-level studies of HS prevalence, incidence, and risk factors using large healthcare databases across Kaiser Permanente and VA systems.',
    focus: 'Multi-site cohort studies with validated case definitions',
    keyWork: ['HS incidence in transgender individuals (JAAD)', 'HS prevalence in youth (JID)'],
    relatedPublicationIds: [
      'incidence-of-hidradenitis-suppurativa-in-transgender-and-cisgender-individuals-a',
      'hidradenitis-suppurativa-prevalence-in-transgender-and-cisgender-youth-a-multi-r',
    ],
  },
  {
    id: 'clinical-informatics',
    title: 'Clinical Decision Support & NLP',
    description:
      'Development of natural language processing pipelines for prescription pattern analysis, telemedicine optimization, and clinical decision support in dermatology.',
    focus: 'Applied informatics for care delivery improvement',
    keyWork: ['Isotretinoin telemedicine outcomes (JAAD Int)', 'Prescription adherence analysis'],
    relatedPublicationIds: [
      'video-synchronous-isotretinoin-management-is-associated-with-lower-risk-of-patie',
      '52472-deconstructing-trends-in-the-equity-of-teledermatology-use-and-outcomes-am',
      'adherence-to-oral-antibiotic-duration-guidelines-for-acne-treatment-in-transgend',
    ],
  },
  {
    id: 'health-equity',
    title: 'Health Equity in Dermatology',
    description:
      'Research on care access, treatment environments, and survivorship resources for sexual and gender minority patients with skin cancer.',
    focus: 'Addressing disparities where data gaps limit clinical guidance',
    keyWork: ['SGM skin cancer survivorship (Arch Derm Res)', 'Healthcare barriers (OUT Survey)'],
    relatedPublicationIds: [
      'skin-cancer-treatment-environment-and-survivorship-resources-among-sexual-and-ge',
    ],
  },
]

export const getResearchThemeById = (id: string): ResearchDirection | undefined =>
  researchThemes.find((theme) => theme.id === id)
