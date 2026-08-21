export type ArticleSection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export type Article = {
  slug: "typography" | "user-experience" | "color-theory";
  index: string;
  category: string;
  read: string;
  title: string;
  dek: string;
  premise: string;
  pullQuote: string;
  fieldNotes: Array<{ label: string; title: string; text: string }>;
  sections: ArticleSection[];
  checklist: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "typography",
    index: "01",
    category: "Typography",
    read: "5 min read",
    title: "The Power of Typography in Visual Design",
    dek: "Typography is not the finishing touch. It is the voice, pace, and structure that helps a visual system make sense before a single interaction occurs.",
    premise: "A type system should make the important thing easier to notice, the next thing easier to understand, and the whole experience easier to trust.",
    pullQuote: "Type is interface architecture in plain sight.",
    fieldNotes: [
      {
        label: "01 / hierarchy",
        title: "Give each level a job",
        text: "A headline introduces a decision. A subhead frames it. Body copy resolves it. When every size tries to be expressive, nothing is responsible for orientation.",
      },
      {
        label: "02 / rhythm",
        title: "Design the pauses",
        text: "Line length, leading, and spacing are not empty space. They establish a reading tempo that decides whether dense information feels calm or exhausting.",
      },
      {
        label: "03 / contrast",
        title: "Use emphasis sparingly",
        text: "Weight, case, scale, and color work best as a controlled vocabulary. Reserve the loudest move for the one message the page cannot afford to lose.",
      },
    ],
    sections: [
      {
        eyebrow: "Start with reading, not decoration",
        title: "A type scale is a map of attention",
        paragraphs: [
          "Most visual systems begin with a collection of fonts. Strong systems begin with a sequence of decisions: what should be noticed first, what should be scanned next, and what can wait. Typography is the mechanism that turns that sequence into a usable reading path.",
          "I build scales around roles rather than arbitrary sizes. Display type carries the promise of the page. Headlines break the promise into ideas. Supporting copy clarifies the commitment. Utility text makes the interface accountable. Once those roles are clear, size and weight become tools instead of decoration.",
        ],
      },
      {
        eyebrow: "The details users feel",
        title: "Rhythm is a performance decision",
        paragraphs: [
          "A page can have excellent words and still feel difficult because its rhythm is wrong. Tight leading turns a thoughtful paragraph into a wall. Generous leading without an intentional measure turns it into a slow drift. The work is to tune the relationship between width, line height, and the distance to the next idea.",
          "This is especially important in responsive work. A desktop measure cannot simply shrink into a phone. On smaller screens I reduce the number of simultaneous hierarchy levels, protect comfortable line length, and let supporting detail move lower in the sequence. The result is not merely responsive type; it is responsive comprehension.",
        ],
      },
      {
        eyebrow: "A system that can survive production",
        title: "Consistency gives personality room to breathe",
        paragraphs: [
          "Expressive typography earns its place when the system beneath it is reliable. That means defining display, heading, body, label, and metadata styles before inventing one-off exceptions. A consistent baseline lets an editorial moment feel deliberate rather than accidental.",
          "In practice, I test type where it will actually live: long names, narrow cards, translated labels, error states, and real content volumes. The goal is not to make every line look identical. The goal is to make the system stay composed when the content stops being ideal.",
        ],
      },
    ],
    checklist: [
      "Can a reader identify the primary action in three seconds?",
      "Does every text style have one clear responsibility?",
      "Does the reading measure remain comfortable at each breakpoint?",
      "Have real content, not placeholder copy, tested the hierarchy?",
    ],
  },
  {
    slug: "user-experience",
    index: "02",
    category: "User Experience",
    read: "4 min read",
    title: "Designing for User Experience",
    dek: "The best interface does not demand attention. It removes uncertainty at the moment a person needs to make a decision.",
    premise: "Experience design is the discipline of making the next sensible action obvious, reversible, and proportionate to the user’s confidence.",
    pullQuote: "Clarity is what a product feels like when it respects a person’s time.",
    fieldNotes: [
      {
        label: "01 / intent",
        title: "Start with the job",
        text: "Before mapping screens, name the progress a person is trying to make. Features are ingredients; the user’s job is the meal.",
      },
      {
        label: "02 / flow",
        title: "Reveal only the next decision",
        text: "A good flow keeps context available but does not make every option compete at once. Progressive disclosure is an act of respect.",
      },
      {
        label: "03 / feedback",
        title: "Make consequences legible",
        text: "Every tap, save, wait, and failure needs a response. Feedback closes the gap between what a person did and what the system understood.",
      },
    ],
    sections: [
      {
        eyebrow: "Experience starts before the interface",
        title: "Frame the decision, not the screen",
        paragraphs: [
          "A polished screen can still fail if it answers the wrong question. I begin by identifying the decision the person is trying to make and the friction that is making it hard. That framing turns vague requests such as ‘make checkout simpler’ into concrete design work: reduce doubt about total cost, make delivery timing visible, and keep recovery close at hand.",
          "Once the decision is clear, the interface becomes a sequence of evidence. The order of information should mirror the order in which confidence is built. People do not need every detail immediately; they need the right detail before they are asked to commit.",
        ],
      },
      {
        eyebrow: "Reducing cognitive drag",
        title: "A flow should earn every step",
        paragraphs: [
          "Every additional field, modal, and choice asks a person to spend attention. Some of that cost is necessary. Much of it comes from a product trying to expose its internal complexity. Strong UX separates what the system needs to know from what the person needs to decide right now.",
          "I look for opportunities to stage complexity: keep the primary path visible, offer expert controls when they are useful, and preserve enough context that people do not feel lost when they step away. The aim is not minimalism for its own sake. It is momentum without confusion.",
        ],
      },
      {
        eyebrow: "Design for real conditions",
        title: "Trust is built in edge states",
        paragraphs: [
          "Happy paths prove that an idea can work. Empty states, slow networks, permission failures, duplicate submissions, and changed minds prove that it can be trusted. These moments are where product tone becomes tangible.",
          "I design feedback as part of the flow, not as a patch after development. Loading states set expectation. Confirmation states reduce doubt. Error states explain what happened and what can be done next. When those messages are specific, the interface feels less like a machine and more like a competent collaborator.",
        ],
      },
    ],
    checklist: [
      "What progress is the person trying to make in this moment?",
      "Which choice must be visible now, and which can wait?",
      "Can a person recover without losing context or work?",
      "Does every system response explain both status and next step?",
    ],
  },
  {
    slug: "color-theory",
    index: "03",
    category: "Color Theory",
    read: "6 min read",
    title: "Mastering the Art of Color Theory",
    dek: "Color has a job beyond decoration: it organizes attention, carries meaning, and gives a product a sensory point of view.",
    premise: "A mature palette is not a collection of favorite swatches. It is a set of relationships that remains useful when the interface becomes busy.",
    pullQuote: "Color becomes confident when it is governed by purpose, not preference.",
    fieldNotes: [
      {
        label: "01 / roles",
        title: "Name what color does",
        text: "Base, surface, ink, accent, success, warning, and danger are product roles. Naming those roles protects the system from arbitrary additions.",
      },
      {
        label: "02 / contrast",
        title: "Value carries the hierarchy",
        text: "Hue brings character, but lightness contrast tells people what is actionable, grouped, secondary, or intentionally quiet.",
      },
      {
        label: "03 / restraint",
        title: "Let the accent be scarce",
        text: "An accent only directs attention when it is not everywhere. Reserve it for progress, decisive actions, and moments that deserve memory.",
      },
    ],
    sections: [
      {
        eyebrow: "Beyond the swatch board",
        title: "Color is a language of roles",
        paragraphs: [
          "A palette becomes useful when each color explains why it exists. A surface separates layers. Ink carries language. A muted tone creates distance. An accent signals the path forward. Without those assignments, color drifts into taste and the interface slowly loses its internal logic.",
          "I define the neutral system first because neutrals carry most of the product. They establish density, depth, and reading comfort. Accent colors are then introduced as a precise contrast to that foundation, not as a substitute for hierarchy the layout has failed to provide.",
        ],
      },
      {
        eyebrow: "Composition before saturation",
        title: "Value is the silent hierarchy",
        paragraphs: [
          "A screen can remain understandable when viewed in grayscale if its hierarchy is doing its job. That is a useful discipline because it forces the design to rely on value, spacing, and typography before hue is asked to solve everything.",
          "I use saturation as a volume control. High saturation is an interruption; low saturation is an atmosphere. When those intensities are distributed intentionally, the interface can feel energetic without becoming noisy and quiet without becoming lifeless.",
        ],
      },
      {
        eyebrow: "Make accessibility part of the aesthetic",
        title: "Contrast is not the enemy of expression",
        paragraphs: [
          "Accessible color decisions often improve the visual system because they make intent explicit. If an action only works when someone perceives a specific hue, the system is too fragile. Pair color with labels, shape, weight, position, or iconography so meaning remains available in more than one channel.",
          "The goal is not to flatten every palette into the safest possible choice. It is to make expressive choices that still hold their meaning in bright sunlight, low-quality displays, and real moments of distraction. That is where visual confidence becomes product confidence.",
        ],
      },
    ],
    checklist: [
      "Does each color have a named interface role?",
      "Would the hierarchy survive a grayscale view?",
      "Is the accent color reserved for meaningful moments?",
      "Can critical states be understood without color alone?",
    ],
  },
];

export const getArticle = (slug: string) => ARTICLES.find((article) => article.slug === slug);
