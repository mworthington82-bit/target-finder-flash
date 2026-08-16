export type AreaId = "AREA1" | "AREA2" | "AREA3" | "AREA4" | "AREA5" | "AREA6";

export interface Area {
  id: AreaId;
  name: string;
  description: string;
  goodLooksLike: string;
}

export interface QuestionOption {
  text: string;
  area: AreaId;
}

export interface Question {
  stem: string;
  options: QuestionOption[];
}

export interface Behaviour {
  id: string;
  statement: string;
  priors: AreaId[];
  questions: Question[];
}

export interface Target {
  id: string;
  text: string;
  reflections: string[];
  hints: string[];
  pedagogy: string;
}

export const TIE_ORDER: AreaId[] = ["AREA6", "AREA2", "AREA5", "AREA4", "AREA3", "AREA1"];

export const AREAS: Record<AreaId, Area> = {
  AREA1: {
    id: "AREA1",
    name: "Curriculum intent and sequencing",
    description: "Learners may be meeting work without seeing how it connects to earlier learning, or finding that knowledge assumed from a previous unit is not secure enough to build on.",
    goodLooksLike: "Learning connects clearly across sessions, with learners able to use earlier knowledge confidently as they move into new content.",
  },
  AREA2: {
    id: "AREA2",
    name: "High expectations, stretch and challenge",
    description: "Learners may be completing the work but stopping at the first acceptable response, with too little reason to explain, connect, justify or take their thinking further.",
    goodLooksLike: "Every learner is expected to think hard, explain their reasoning and move beyond completion towards depth, precision and application.",
  },
  AREA3: {
    id: "AREA3",
    name: "Behaviour and attitudes",
    description: "Learning time may be slipping away through slow starts, transitions, side-chat or disengagement, particularly when the next part of the session is not yet owned by learners.",
    goodLooksLike: "Learners use lesson time purposefully, including at arrivals, transitions and independent working moments.",
  },
  AREA4: {
    id: "AREA4",
    name: "Inclusion and SEND",
    description: "Some learners may be waiting, depending on adults or peers, or quietly withdrawing when support is not immediately available or does not help them access the same learning.",
    goodLooksLike: "Support enables learners to access ambitious learning, participate fully and develop increasing independence.",
  },
  AREA5: {
    id: "AREA5",
    name: "Subject expertise and pedagogy",
    description: "Learners may be relying on reassurance, prompts or remembered steps instead of using subject knowledge independently, showing that ideas are not yet secure enough to apply.",
    goodLooksLike: "Learners use subject knowledge, representations and methods with growing fluency, independence and accuracy.",
  },
  AREA6: {
    id: "AREA6",
    name: "Formative assessment",
    description: "Too much of the group's thinking may remain hidden, or learners may not know what they are improving, meaning misconceptions and next steps surface too late.",
    goodLooksLike: "Every learner's understanding is made visible often enough to guide the next learning move.",
  },
};

export const BEHAVIOURS: Behaviour[] = [
  {
    id: "B1",
    statement: "Some learners finish early, then switch off",
    priors: ["AREA2","AREA6"],
    questions: [
      {
        stem: "Think of the last task where someone finished early. When they finished, they…",
        options: [
          { text: "sat quietly until you reached them", area: "AREA6" },
          { text: "glanced at the extension and did the minimum of it", area: "AREA2" },
          { text: "started helping the person next to them", area: "AREA4" },
        ],
      },
      {
        stem: "On that task, the work they handed in after finishing early was…",
        options: [
          { text: "quickly completed but hard to read as secure understanding", area: "AREA6" },
          { text: "finished at the first answer without further reasoning", area: "AREA2" },
          { text: "stronger when another learner talked them through it", area: "AREA4" },
        ],
      },
      {
        stem: "When early finishers wait, they usually…",
        options: [
          { text: "wait for you to decide whether their answer is right", area: "AREA6" },
          { text: "have no clear reason to revisit or deepen their work", area: "AREA2" },
          { text: "move towards a peer rather than their own next step", area: "AREA4" },
        ],
      },
      {
        stem: "When learners first see a task, the next level of thinking is…",
        options: [
          { text: "not visible until you check their work", area: "AREA6" },
          { text: "there but easy to avoid after the core task", area: "AREA2" },
          { text: "hard for some learners to access without someone beside them", area: "AREA4" },
        ],
      },
    ],
  },
  {
    id: "B2",
    statement: "The same few voices answer everything",
    priors: ["AREA6","AREA2"],
    questions: [
      {
        stem: "In the last discussion, the first hands up were…",
        options: [
          { text: "the same familiar few", area: "AREA6" },
          { text: "learners who had already finished the work", area: "AREA2" },
          { text: "learners others looked to before answering", area: "AREA4" },
        ],
      },
      {
        stem: "After one learner answers aloud, most of the group…",
        options: [
          { text: "move on without showing whether they agree", area: "AREA6" },
          { text: "hear a first answer that is not pushed further", area: "AREA2" },
          { text: "wait for the confident voice to carry the discussion", area: "AREA4" },
        ],
      },
      {
        stem: "When quieter learners are asked directly, they usually…",
        options: [
          { text: "have not shown a response beforehand", area: "AREA6" },
          { text: "give the first idea and stop there", area: "AREA2" },
          { text: "look to another learner before beginning", area: "AREA4" },
        ],
      },
      {
        stem: "Looking back at discussion work, you can see…",
        options: [
          { text: "only a few learners changed their thinking", area: "AREA6" },
          { text: "answers stayed at a basic level", area: "AREA2" },
          { text: "some learners had no route into the exchange", area: "AREA4" },
        ],
      },
    ],
  },
  {
    id: "B3",
    statement: "Quiet learners get through whole lessons without being heard from",
    priors: ["AREA6","AREA4"],
    questions: [
      {
        stem: "Think of a quiet learner in the last lesson. During the task, they…",
        options: [
          { text: "completed work without you seeing their thinking", area: "AREA6" },
          { text: "wrote an answer that stayed at the first idea", area: "AREA2" },
          { text: "waited for a prompt before attempting the next step", area: "AREA4" },
        ],
      },
      {
        stem: "When you paused to check an idea, quiet learners were…",
        options: [
          { text: "not asked to show an answer", area: "AREA6" },
          { text: "not asked to extend or justify an answer", area: "AREA2" },
          { text: "waiting for a partner to begin", area: "AREA4" },
        ],
      },
      {
        stem: "At the end of the session, a quiet learner could most often show…",
        options: [
          { text: "a finished page but not explain their choices", area: "AREA6" },
          { text: "a correct answer with no added reasoning", area: "AREA2" },
          { text: "work completed with repeated reassurance", area: "AREA4" },
        ],
      },
      {
        stem: "When learners work in pairs, quiet learners tend to…",
        options: [
          { text: "let the partner report back", area: "AREA6" },
          { text: "settle for the first acceptable answer", area: "AREA2" },
          { text: "depend on the partner to carry the next step", area: "AREA4" },
        ],
      },
    ],
  },
  {
    id: "B4",
    statement: "Work gets completed, but the thinking is shallow",
    priors: ["AREA2","AREA5"],
    questions: [
      {
        stem: "Look at the last completed task. The work was shallow because learners mostly…",
        options: [
          { text: "repeated a method without explaining why", area: "AREA2" },
          { text: "made changes only when you pointed to them", area: "AREA6" },
          { text: "used remembered steps without adapting them", area: "AREA5" },
        ],
      },
      {
        stem: "When learners improved an answer, they were most likely to…",
        options: [
          { text: "add more words without changing the thinking", area: "AREA2" },
          { text: "ask what exactly they should fix", area: "AREA6" },
          { text: "wait for a model before trying again", area: "AREA5" },
        ],
      },
      {
        stem: "In the last discussion, learners' answers tended to…",
        options: [
          { text: "name an answer but not justify it", area: "AREA2" },
          { text: "stay untested across the group", area: "AREA6" },
          { text: "use a method without explaining the choice", area: "AREA5" },
        ],
      },
      {
        stem: "When a task is completed, learners generally…",
        options: [
          { text: "see completion as the end rather than a starting point", area: "AREA2" },
          { text: "cannot point to a specific next improvement", area: "AREA6" },
          { text: "wait for confirmation before applying the idea elsewhere", area: "AREA5" },
        ],
      },
    ],
  },
  {
    id: "B5",
    statement: "Learners won't start without checking with me first",
    priors: ["AREA5","AREA4"],
    questions: [
      {
        stem: "Think of the last time learners had to begin a task. Before writing, they…",
        options: [
          { text: "asked whether their first step was right", area: "AREA5" },
          { text: "waited for a support sheet to be explained again", area: "AREA4" },
          { text: "asked what they needed to improve from last time", area: "AREA6" },
        ],
      },
      {
        stem: "When you move away after giving instructions, learners who pause usually…",
        options: [
          { text: "wait for you to return", area: "AREA5" },
          { text: "look for individual help rather than use available support", area: "AREA4" },
          { text: "ask whether their answer meets the target", area: "AREA6" },
        ],
      },
      {
        stem: "On a familiar task, learners most often begin by…",
        options: [
          { text: "checking each step with you", area: "AREA5" },
          { text: "looking for a scaffold used before", area: "AREA4" },
          { text: "asking what a good finished version should include", area: "AREA6" },
        ],
      },
      {
        stem: "When someone gets stuck, their first move is usually to…",
        options: [
          { text: "put their hand up before attempting anything", area: "AREA5" },
          { text: "wait for individual support", area: "AREA4" },
          { text: "ask you to tell them what to change", area: "AREA6" },
        ],
      },
    ],
  },
  {
    id: "B6",
    statement: "They could do it last week — it's gone now",
    priors: ["AREA5","AREA1"],
    questions: [
      {
        stem: "Think of content learners knew last week. When it came up again, they…",
        options: [
          { text: "needed the idea retaught before using it", area: "AREA1" },
          { text: "gave answers that sounded confident but were incomplete", area: "AREA6" },
          { text: "looked for old notes before trying to remember", area: "AREA5" },
        ],
      },
      {
        stem: "When you asked about earlier learning, learners…",
        options: [
          { text: "could recognise the answer but not recall it", area: "AREA1" },
          { text: "were not all asked to show a response", area: "AREA6" },
          { text: "waited for someone else to answer first", area: "AREA5" },
        ],
      },
      {
        stem: "In a later task, learners used previous learning by…",
        options: [
          { text: "forgetting it until a reminder appeared", area: "AREA1" },
          { text: "using it wrongly without this being noticed early", area: "AREA6" },
          { text: "asking which earlier method to use", area: "AREA5" },
        ],
      },
      {
        stem: "When revision is mentioned, learners tend to…",
        options: [
          { text: "meet forgotten content as if it is new", area: "AREA1" },
          { text: "find out too late what is insecure", area: "AREA6" },
          { text: "wait for you to select what to revisit", area: "AREA5" },
        ],
      },
    ],
  },
  {
    id: "B7",
    statement: "Phones and side-chat creep in mid-task",
    priors: ["AREA3","AREA2"],
    questions: [
      {
        stem: "Think of the last mid-task drift. It started when…",
        options: [
          { text: "there was a pause while learners waited for the next instruction", area: "AREA3" },
          { text: "a learner finished and had no next level to move to", area: "AREA2" },
          { text: "learners were unsure what success looked like", area: "AREA6" },
        ],
      },
      {
        stem: "When phones appear during a task, the group is usually…",
        options: [
          { text: "between clear stages of activity", area: "AREA3" },
          { text: "working through items that no longer demand much thought", area: "AREA2" },
          { text: "waiting for you to check individual work", area: "AREA6" },
        ],
      },
      {
        stem: "After side-chat begins, learners are most likely to…",
        options: [
          { text: "return only when you personally redirect them", area: "AREA3" },
          { text: "complete the minimum and stop", area: "AREA2" },
          { text: "ask what they should be doing next", area: "AREA6" },
        ],
      },
      {
        stem: "During transitions, the task learners move into is…",
        options: [
          { text: "not ready or visible when the previous task ends", area: "AREA3" },
          { text: "too easily completed without further reasoning", area: "AREA2" },
          { text: "unclear enough that learners wait to be checked", area: "AREA6" },
        ],
      },
    ],
  },
  {
    id: "B8",
    statement: "Late arrivals and slow starts",
    priors: ["AREA3","AREA1"],
    questions: [
      {
        stem: "Think of the last slow start. Learners arriving on time first…",
        options: [
          { text: "waited for you to announce what to do", area: "AREA3" },
          { text: "settled without revisiting anything from the previous session", area: "AREA1" },
          { text: "asked others what they had missed", area: "AREA6" },
        ],
      },
      {
        stem: "When late learners enter, the class usually…",
        options: [
          { text: "loses the first minutes while they get oriented", area: "AREA3" },
          { text: "moves on without a route into earlier learning", area: "AREA1" },
          { text: "cannot show quickly what late learners have understood", area: "AREA6" },
        ],
      },
      {
        stem: "At the start of a session, the opening activity is most often…",
        options: [
          { text: "unclear until everyone is settled", area: "AREA3" },
          { text: "new work rather than a chance to reconnect prior learning", area: "AREA1" },
          { text: "something you cannot quickly read across the group", area: "AREA6" },
        ],
      },
      {
        stem: "After a slow start, learners are most likely to have missed…",
        options: [
          { text: "a routine that gets everyone working immediately", area: "AREA3" },
          { text: "a short chance to bring earlier learning back", area: "AREA1" },
          { text: "a way to show what they already know", area: "AREA6" },
        ],
      },
    ],
  },
  {
    id: "B9",
    statement: "Learners can't say what they're working on improving",
    priors: ["AREA6","AREA2"],
    questions: [
      {
        stem: "Think of the last time you asked what someone was improving. They…",
        options: [
          { text: "could name a mark but not the change they were making", area: "AREA6" },
          { text: "waited for you to tell them whether the work was secure", area: "AREA2" },
          { text: "asked for the next step before rereading their feedback", area: "AREA5" },
        ],
      },
      {
        stem: "After feedback is returned, learners usually…",
        options: [
          { text: "put it away before acting on it", area: "AREA6" },
          { text: "make the smallest possible change", area: "AREA2" },
          { text: "wait for you to identify what to do first", area: "AREA5" },
        ],
      },
      {
        stem: "When learners improve work, they tend to…",
        options: [
          { text: "make a general change rather than one linked to a target", area: "AREA6" },
          { text: "stop once an answer looks acceptable", area: "AREA2" },
          { text: "ask you to approve each change", area: "AREA5" },
        ],
      },
      {
        stem: "At the beginning of a new task, learners can most often say…",
        options: [
          { text: "what the task is, but not their improvement focus", area: "AREA6" },
          { text: "what to complete, but not how to deepen it", area: "AREA2" },
          { text: "what you want them to do, rather than what they will try", area: "AREA5" },
        ],
      },
    ],
  },
  {
    id: "B10",
    statement: "Learners with support plans wait, depend, or quietly disengage",
    priors: ["AREA4","AREA5"],
    questions: [
      {
        stem: "Think of a learner with a support plan in the last task. They…",
        options: [
          { text: "waited for an adult or you before beginning", area: "AREA4" },
          { text: "used the scaffold without attempting a faded version", area: "AREA5" },
          { text: "completed a simpler version while others went deeper", area: "AREA2" },
        ],
      },
      {
        stem: "When support is available, these learners most often…",
        options: [
          { text: "wait for it rather than start with what they know", area: "AREA4" },
          { text: "keep using it after they could attempt alone", area: "AREA5" },
          { text: "are not asked to tackle the same depth of thinking", area: "AREA2" },
        ],
      },
      {
        stem: "In group work, supported learners tend to…",
        options: [
          { text: "quietly disengage when support is not immediate", area: "AREA4" },
          { text: "depend on a partner to carry the next step", area: "AREA5" },
          { text: "take the easiest role rather than reason through the task", area: "AREA2" },
        ],
      },
      {
        stem: "When you review their work, the main pattern is…",
        options: [
          { text: "the planned support was not available at the point needed", area: "AREA4" },
          { text: "help stayed in place for the whole task", area: "AREA5" },
          { text: "the work reached less depth than the group task", area: "AREA2" },
        ],
      },
    ],
  },
  {
    id: "B11",
    statement: "Learners do not see how today's work connects to what came before",
    priors: ["AREA1","AREA5"],
    questions: [
      {
        stem: "Think of today's work. When learners were asked how it linked to earlier learning, they…",
        options: [
          { text: "could not say what it built on", area: "AREA1" },
          { text: "waited for you to name the connection", area: "AREA5" },
          { text: "gave an answer that was not checked across the group", area: "AREA6" },
        ],
      },
      {
        stem: "When a familiar idea returned in a new topic, learners…",
        options: [
          { text: "treated it as if it was unrelated", area: "AREA1" },
          { text: "could not choose how to use it without prompting", area: "AREA5" },
          { text: "showed confidence that hid uncertainty", area: "AREA6" },
        ],
      },
      {
        stem: "At the start of a new task, learners usually…",
        options: [
          { text: "focus only on today's instructions", area: "AREA1" },
          { text: "ask which method they should use", area: "AREA5" },
          { text: "cannot show what they remember before moving on", area: "AREA6" },
        ],
      },
      {
        stem: "When learners explain a completed task, they tend to…",
        options: [
          { text: "describe what they did today but not the learning journey", area: "AREA1" },
          { text: "repeat a step without explaining why it fits", area: "AREA5" },
          { text: "offer a response from only a few voices", area: "AREA6" },
        ],
      },
    ],
  },
  {
    id: "B12",
    statement: "Learners struggle because knowledge assumed from an earlier unit is not there",
    priors: ["AREA1","AREA6"],
    questions: [
      {
        stem: "Think of the last task that relied on an earlier unit. Learners…",
        options: [
          { text: "needed knowledge from that unit retaught", area: "AREA1" },
          { text: "could not show which part they did not understand", area: "AREA6" },
          { text: "waited for you to select a method for them", area: "AREA5" },
        ],
      },
      {
        stem: "When earlier knowledge is assumed, learners most often…",
        options: [
          { text: "start the task with a missing foundation", area: "AREA1" },
          { text: "produce work that looks complete but contains hidden errors", area: "AREA6" },
          { text: "look for a worked example before trying", area: "AREA5" },
        ],
      },
      {
        stem: "When you ask a question from the earlier unit, learners…",
        options: [
          { text: "cannot retrieve it without seeing notes", area: "AREA1" },
          { text: "give a response from only the most confident learners", area: "AREA6" },
          { text: "recognise the method but cannot use it independently", area: "AREA5" },
        ],
      },
      {
        stem: "As the task becomes harder, learners usually…",
        options: [
          { text: "get stuck where previous knowledge should carry them", area: "AREA1" },
          { text: "reach the end before misunderstanding is noticed", area: "AREA6" },
          { text: "ask you to tell them the next step", area: "AREA5" },
        ],
      },
    ],
  },
];

export const TARGETS: Record<AreaId, Target[]> = {
  AREA1: [
    {
      id: "A1T1",
      text: "In Launch and Establish, I will develop how I reconnect learners with the knowledge and ideas that today's learning depends on, so that new work feels connected rather than separate. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "Which single piece of prior knowledge does your next lesson quietly assume?",
        "When did learners last meet that idea, and in what form?",
        "What would you notice if half the group arrived without it?",
      ],
      hints: [
        "Open next week's lesson. Name the one thing it expects them to know.",
        "Find the week it was taught. Look at what they actually produced.",
        "Picture six learners stuck at task one. What are they doing?",
      ],
      pedagogy: "Rosenshine's Principles of Instruction — the case for beginning every lesson with a short review of earlier learning.",
    },
    {
      id: "A1T2",
      text: "In Establish and Apply, I will develop how learners recognise the journey from earlier learning into the current task, so that they can explain why this learning matters now. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "If a learner asked “why are we doing this now?”, what would you say?",
        "What did last term's work make possible that this week depends on?",
        "Where in the session would that connection best land?",
      ],
      hints: [
        "Say your answer out loud. Time it. Under twenty seconds?",
        "Put last term's task next to this week's. Name the link.",
        "Walk through your session. Mark the minute you would say it.",
      ],
      pedagogy: "Ausubel's meaningful learning — new ideas stick when learners can hook them onto what they already know.",
    },
    {
      id: "A1T3",
      text: "In Launch, Establish and Demonstrate, I will develop how I identify and respond when assumed prior knowledge is not secure, so that gaps do not become barriers to later learning. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "How do you currently find out that something isn't secure?",
        "At what point in a unit do gaps usually surface, and is that too late?",
        "What would you do differently if you knew in week one rather than week six?",
      ],
      hints: [
        "Look back at your last three lessons. When did you last check?",
        "Take last term's marks. Find the week the drop appeared.",
        "Name the week one task that would have shown you.",
      ],
      pedagogy: "Diagnostic assessment — short checks placed before teaching rather than after, so gaps show while there is still time.",
    },
  ],
  AREA2: [
    {
      id: "A2T1",
      text: "In Establish and Apply, I will develop how every learner is expected to move beyond a first acceptable answer, so that completed work shows depth, reasoning and subject-specific precision. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "What does a finished answer look like in your subject, and what does an excellent one look like?",
        "What currently signals to learners that they can stop?",
        "Which task this week could not be completed without reasoning?",
      ],
      hints: [
        "Pull two pieces of learner work. Put them side by side.",
        "Watch one learner finish. What do they do next?",
        "Read this week's tasks. Count how many need a because.",
      ],
      pedagogy: "Bloom's revised taxonomy — the difference between recalling an answer and analysing, evaluating or creating with it.",
    },
    {
      id: "A2T2",
      text: "In Apply and Demonstrate, I will develop how learners explain, justify and connect their ideas, so that participation is not limited to recall or short answers. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "When learners answer, how often are they asked why?",
        "Whose reasoning do you hear, and whose do you only ever see written down?",
        "What would a strong justification sound like in your subject?",
      ],
      hints: [
        "Count your questions in ten minutes. How many were follow-ups?",
        "Take your register. Name three you never hear explain.",
        "Say one aloud yourself. Write down the words you used.",
      ],
      pedagogy: "Alexander's dialogic teaching — learning deepens when classroom talk goes past single answers into extended reasoning.",
    },
    {
      id: "A2T3",
      text: "In Launch and Apply, I will develop how learners recognise the ambition within a task, so that they continue thinking when the core work is complete. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "Can learners see the harder version of the task before they start?",
        "What happens in your room when someone finishes first?",
        "What would make depth the obvious next move rather than an optional extra?",
      ],
      hints: [
        "Look at the worksheet. Is the harder part visible on page one?",
        "Picture your fastest learner at minute twenty. Where are they?",
        "Read your task wording. Where does it say stop?",
      ],
      pedagogy: "Vygotsky's zone of proximal development — learners grow most on work just beyond what they can already do alone.",
    },
  ],
  AREA3: [
    {
      id: "A3T1",
      text: "In Launch and Apply, I will develop how learners begin and sustain purposeful learning activity, so that slow starts and mid-task drift take less time away from the session. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "Which minutes of your session currently belong to nobody?",
        "What are learners doing in the first sixty seconds after they arrive?",
        "When drift starts, what is the task asking of them at that moment?",
      ],
      hints: [
        "Walk through your last session minute by minute. Where does nothing happen?",
        "Picture the doorway. What do the first three through it do?",
        "Note the clock time drift starts. Look at that task.",
      ],
      pedagogy: "Tom Bennett's Creating a Culture — behaviour improves when routines are taught deliberately rather than assumed.",
    },
    {
      id: "A3T2",
      text: "In Launch and Establish, I will develop how learners enter learning quickly at arrivals and transitions, so that every minute has a clear learning purpose. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "What is on the desk or screen before learners walk in?",
        "How many transitions does your session contain, and how long does each take?",
        "What would have to be true for the first five minutes to run without you?",
      ],
      hints: [
        "Stand at the door of your empty room. What can they see?",
        "Count the changeovers in one session. Time the longest.",
        "Picture yourself arriving late. What would they start?",
      ],
      pedagogy: "Doug Lemov's Teach Like a Champion — routines such as a Do Now put learners to work the moment they arrive.",
    },
    {
      id: "A3T3",
      text: "In Apply and Demonstrate, I will develop how learners maintain attention when working independently, so that phones, side-chat and waiting do not become the default. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "How long is your longest stretch of unbroken independent work?",
        "What tells a learner their work will actually be looked at?",
        "Where in that stretch does attention usually go?",
      ],
      hints: [
        "Time it next session. Write the number down.",
        "Ask three learners when you last read their work.",
        "Watch the clock during independent work. Note the minute it slips.",
      ],
      pedagogy: "Sweller's cognitive load theory — attention holds when a task is clear and does not overload working memory.",
    },
  ],
  AREA4: [
    {
      id: "A4T1",
      text: "In Launch and Establish, I will develop how learners with support plans access the same ambitious learning without waiting for individual rescue, so that they participate from the start. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "What can a supported learner start on their own, before anyone reaches them?",
        "How long do they typically wait?",
        "What do the first five minutes look like from their seat?",
      ],
      hints: [
        "Name one learner. What could they do in the first two minutes unaided?",
        "Time the gap between them sitting down and someone reaching them.",
        "Sit in their chair. Look at what is in front of you.",
      ],
      pedagogy: "The EEF's SEND in Mainstream Schools guidance — strong teaching for everyone comes before individual adult support.",
    },
    {
      id: "A4T2",
      text: "In Establish and Apply, I will develop how support helps learners take increasingly independent next steps, so that dependence on adults, prompts or peers reduces over time. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "Which scaffolds in your room have been there since September?",
        "What would you remove first, and what would happen?",
        "How would you know a learner no longer needed it?",
      ],
      hints: [
        "Look at your walls and handouts. Note what has not changed.",
        "Pick one prompt sheet. Picture the lesson without it.",
        "Name one learner who never looks at it any more.",
      ],
      pedagogy: "Wood, Bruner and Ross on scaffolding — support is meant to be temporary and removed as competence grows.",
    },
    {
      id: "A4T3",
      text: "In Apply and Demonstrate, I will develop how quieter or supported learners contribute their thinking, so that participation and progress are visible across the group. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "Whose thinking did you see least of last lesson?",
        "What route into contributing exists that doesn't require speaking first?",
        "What would have to change for their thinking to be visible to you every session?",
      ],
      hints: [
        "Take your register. Tick who you actually heard from last lesson.",
        "List the ways a learner can answer without using their voice.",
        "Count how many learners you saw real evidence from last session.",
      ],
      pedagogy: "Dylan Wiliam's Embedding Formative Assessment — all-learner response methods make quiet learners' thinking visible.",
    },
  ],
  AREA5: [
    {
      id: "A5T1",
      text: "In Establish and Apply, I will develop how learners use subject knowledge and methods without checking every first move, so that they can begin familiar work with greater independence. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "What are learners actually asking when they ask “is this right?”",
        "What could answer that question instead of you?",
        "What would they need to be sure of to begin alone?",
      ],
      hints: [
        "Listen next session. Write down their exact words.",
        "Look at the desk. What is there to check against?",
        "Watch one learner's first move. Where do they pause?",
      ],
      pedagogy: "Rosenshine's Principles of Instruction — the case for modelling first, then withdrawing support in planned steps.",
    },
    {
      id: "A5T2",
      text: "In Launch and Establish, I will develop how learners retain and use previously taught subject knowledge, so that they can build on it rather than meet it again as new. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "What do learners meet once and never again?",
        "Which idea does your subject keep needing, and how often does it come back?",
        "What would regular return look like in your scheme of work?",
      ],
      hints: [
        "Read your scheme of work. Find a topic taught only once.",
        "Name the idea. Count the weeks it appears.",
        "Look at next month's plan. Mark where it could come back.",
      ],
      pedagogy: "Ebbinghaus's forgetting curve and spaced practice — knowledge fades unless it is deliberately revisited over time.",
    },
    {
      id: "A5T3",
      text: "In Apply and Demonstrate, I will develop how learners make choices, explain methods and correct errors using subject knowledge, so that progress does not depend on tutor reassurance. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "When learners get stuck, do they know which method to try?",
        "Who currently spots the errors in your room?",
        "What would let a learner catch their own mistake before you do?",
      ],
      hints: [
        "Watch a stuck learner for a minute. What do they reach for?",
        "Look at your last marked set. Count the corrections in your pen.",
        "Pick one common error. Name how it shows itself.",
      ],
      pedagogy: "Ericsson's deliberate practice — skill grows when learners work on precise weaknesses and correct their own errors.",
    },
  ],
  AREA6: [
    {
      id: "A6T1",
      text: "In Establish and Apply, I will develop how I check what every learner understands during the session, so that participation and progress stop depending on who volunteers. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "Whose understanding do you currently see, and whose do you assume?",
        "If you could check one thing per session, what would be worth checking?",
        "What happens to what you find out?",
      ],
      hints: [
        "Take your register. Tick who you actually heard from last lesson.",
        "Look at next lesson's objective. Name the one idea it rests on.",
        "Recall your last check. Say what you did in the ten minutes after.",
      ],
      pedagogy: "Black and Wiliam's Inside the Black Box — checking understanding during a lesson lifts results more than marking after it.",
    },
    {
      id: "A6T2",
      text: "In Demonstrate and Apply, I will develop how learners identify and act on their next improvement point, so that feedback becomes visible progress rather than a comment. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "Can each learner name what they are improving right now?",
        "What happens to feedback after it is given?",
        "When does acting on it actually happen in your session?",
      ],
      hints: [
        "Ask three learners what they are working on. Write the answers down.",
        "Open two pieces of work. Look for what changed after your comment.",
        "Walk through your session. Mark the minutes set aside for it.",
      ],
      pedagogy: "Hattie and Timperley's model of feedback — feedback only works when learners are given time to act on it.",
    },
    {
      id: "A6T3",
      text: "In Launch, Establish and Demonstrate, I will develop how I surface insecure understanding early enough to respond, so that misconceptions do not remain hidden until the end. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.",
      reflections: [
        "At what point do you usually find out something wasn't secure?",
        "What would “early enough” mean in your subject?",
        "What would you change on the spot if you knew at minute ten?",
      ],
      hints: [
        "Take your last assessment. Note the week that topic was taught.",
        "Pick one topic. Name the lesson where a wrong idea takes hold.",
        "Picture minute ten. What is on the board then?",
      ],
      pedagogy: "Dylan Wiliam's hinge questions — one well-placed question mid-lesson shows whether to move on or reteach.",
    },
  ],
};

export const FORM_BASE =
  "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=7ACxezLnGEGVoPw4WOs6XsPATjPLlsFLkgDBsoQJl3tURDJYWTJDREdKOVo2MDFKS05JM1gzVEZWRiQlQCNjPTEu";

export function buildFormUrl(areaName: string, targetText: string) {
  return (
    FORM_BASE +
    "&r201037595f474987ab68489c6f24e60e=" +
    encodeURIComponent('"' + areaName + '"') +
    "&rf9807d1c59fa41239009427d48fa12e8=" +
    encodeURIComponent(targetText)
  );
}
