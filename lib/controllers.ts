export interface Controller {
  id: string
  title: string
  authors: string
  description: {
    short: string
    long: string
  }
  image: string
  date: string
  license: string
  citation: string
  copyright: {
    year: string
    line1: string
    line2: string
  }
  url: string
  tags: string[]
  institution: string
  lab: string
}

export const controllers: Controller[] = [
  {
    id: "variable-impedance-control",
    title: "Data-Driven Variable Impedance Control for Variable Activities",
    authors: "T. K. Best, C. G. Welker, and R. D. Gregg",
    description: {
      short: "Our Locomotor Control Systems Lab has pioneered a new approach utilizing a phase variable and continuous impedance parameter functions in lieu of a finite state machine. We use convex optimization to automatically identify optimal impedance parameter functions, resulting in biomimetic joint kinematics and kinetics without manual tuning.",
      long: "Our controller allows a user to sit, stand, and walk across level ground, and it automatically handles switching between walking and sit/stand modes. Potential uses of this software release include but are not limited to: using our controller as a comparison point for a novel walking controller; using our controller as a component in a larger, more complex controller; using our controller when researching other related topics, such as balance or metabolic cost."
    },
    image: "/sit_stand_walk.jpg",
    date: "Dec 20th, 2023",
    license: "Polyform Non-Commercial",
    citation: "T. K. Best, C. G. Welker, E. J. Rouse and R. D. Gregg, 'Data-Driven Variable Impedance Control of a Powered Knee–Ankle Prosthesis for Adaptive Speed and Incline Walking,' in IEEE Transactions on Robotics, vol. 39, no. 3, pp. 2151-2169, June 2023, doi: 10.1109/TRO.2022.3226887",
    copyright: {
      year: "2022",
      line1: "The Regents of the University of Michigan",
      line2: "Locomotor Control Systems Laboratory"
    },
    url: "https://available-inventions.umich.edu/product/data-driven-variable-impedance-control-of-a-powered-knee-ankle-prosthesis-for-variable-activities",
    tags: ["Variable Impedance", "Walking", "Sitting", "Standing", "Phase Variable", "Convex Optimization"],
    institution: "University of Michigan",
    lab: "Locomotor Control Systems Lab"
  },
  {
    id: "myoelectric-control",
    title: "Myoelectric Control for User-directed Activities",
    authors: "R.R. Posh, J.A. Tittle, J.P. Schmiedeler, P.W. Wensing",
    description: {
      short: "Out of the ROAM Lab at the University of Notre Dame, Ryan Posh has designed and compared multiple novel control approaches for robotic lower-limb prostheses. Among these is Hybrid Volitional Control, which makes use of a direct myoelectric controller as a subcomponent. This myoelectric control component, available here for both knee-ankle and ankle-only configurations, allows users to control the Open-Source Leg with any agonist-antagonist muscle pair (e.g. the gastrocnemius and tibialis anterior).",
      long: "This component has been shown to enable a wide variety of user-directed activities, including biomimetic walking, standing on tip-toes, and tapping the foot, leading to high overall satisfaction for individuals with amputation [citation below]. Potential uses of this software release include but are not limited to: using our controller as a comparison point for a novel walking controller; using our controller as a component in a larger, more complex controller like Hybrid Volitional Control; using our controller when researching other related topics, such as human-robot interaction, prosthesis user preference, or fatigue. This software may also be used for other Raspberry Pi projects that would like to incorporate low-cost electromyography."
    },
    image: "/myoelectric.png",
    date: "May 12th, 2024",
    license: "Lesser General Public License (LGPL) v2.1",
    citation: "R. R. Posh, J. P. Schmiedeler, and P. M. Wensing, \"Finite-state impedance and direct myoelectric control for robotic ankle prostheses: Comparing their performance and exploring their combination,\" IEEE T Neur Sys Reh, vol. 31, pp. 2778–2788, 2023.",
    copyright: {
      year: "2024",
      line1: "The University of Notre Dame",
      line2: "Robotics, Optimization, and Assistive Mobility (ROAM) Lab"
    },
    url: "https://github.com/rposh/direct-myoelectric-control",
    tags: ["Myoelectric Control", "EMG", "User-directed", "Knee-Ankle", "Ankle-only", "Human-Robot Interaction"],
    institution: "University of Notre Dame",
    lab: "ROAM Lab"
  }
]

export function formatControllerAuthors(authors: string): string {
  if (!authors) return ""
  
  // Split by comma and format
  const authorList = authors.split(',').map(author => author.trim())
  
  if (authorList.length === 1) {
    return authorList[0]
  } else if (authorList.length === 2) {
    return `${authorList[0]} and ${authorList[1]}`
  } else {
    const lastAuthor = authorList.pop()
    return `${authorList.join(', ')}, and ${lastAuthor}`
  }
}

export function getControllerDownloadUrl(controller: Controller): string {
  return controller.url
} 