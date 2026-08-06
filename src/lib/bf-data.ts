export type AreaId = "AREA1" | "AREA2" | "AREA3" | "AREA4" | "AREA5" | "AREA6";

export interface Area {
  id: AreaId;
  name: string;
  description: string;
  goodLooksLike: string;
}

export const AREAS: Record<AreaId, Area> = {
  AREA1: {
    id: "AREA1",
    name: "Curriculum intent and sequencing",
    description:
      "Learners are meeting each session as a separate event. They can name the task but not what it builds on, and earlier material surfaces late, out of order, or as something they say they have never met.",
    goodLooksLike:
      "Strong practice here means learners can place today's work in a story that runs backwards and forwards across the course.",
  },
  AREA2: {
    id: "AREA2",
    name: "High expectations, stretch and challenge",
    description:
      "Work is being completed, and completed correctly, but it stops at the point of sufficiency. Learners finish, wait, and describe success in terms of getting through rather than getting further.",
    goodLooksLike:
      "Strong practice here means the demand keeps rising for every learner, and finishing early opens more thinking rather than less.",
  },
  AREA3: {
    id: "AREA3",
    name: "Behaviour and attitudes",
    description:
      "Time is leaking at the edges and in the middle of sessions. Starts are slow, attention drifts partway through tasks, and the room needs bringing back more than once in an hour.",
    goodLooksLike:
      "Strong practice here means learners arrive into purposeful activity and stay in it, with routines doing the work rather than reminders.",
  },
  AREA4: {
    id: "AREA4",
    name: "Inclusion and SEND",
    description:
      "Some learners are present but not fully participating. They wait, watch a neighbour, lean on adult support, or move through a whole session without being heard from or asked anything directly.",
    goodLooksLike:
      "Strong practice here means every learner has a way into the same ambitious work, with support that fades rather than fixes.",
  },
  AREA5: {
    id: "AREA5",
    name: "Subject expertise and pedagogy",
    description:
      "Learners are following procedures rather than holding ideas. They reproduce the example, ask which method to use, and stall when a task looks different from the one they were shown.",
    goodLooksLike:
      "Strong practice here means explanations, models and practice are built so learners can transfer the idea, not just repeat the steps.",
  },
  AREA6: {
    id: "AREA6",
    name: "Formative assessment",
    description:
      "What learners know is surfacing late. The same few voices answer, quiet learners pass unread, feedback is received rather than used, and gaps appear at marking rather than during the task.",
    goodLooksLike:
      "Strong practice here means you know what every learner understands while there is still time in the session to act on it.",
  },
};

export const TIE_ORDER: AreaId[] = ["AREA6", "AREA2", "AREA5", "AREA4", "AREA1", "AREA3"];

export interface Option {
  text: string;
  area: AreaId;
}
export interface Question {
  stem: string;
  options: Option[];
}
export interface Behaviour {
  id: string;
  statement: string;
  priors: AreaId[];
  questions: Question[];
}

export const BEHAVIOURS: Behaviour[] = [
  {
    id: "B1",
    statement: "Some learners finish early, then switch off",
    priors: ["AREA2", "AREA6"],
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
        stem: "The last time a task had something extra beyond the main activity, the learners who reached it…",
        options: [
          { text: "asked whether it counted before starting", area: "AREA2" },
          { text: "did it, but you saw nothing of what they produced", area: "AREA6" },
          { text: "skipped it and began packing away", area: "AREA3" },
        ],
      },
      {
        stem: "When an early finisher last showed you their completed work, what you saw was…",
        options: [
          { text: "correct answers with no working underneath", area: "AREA6" },
          { text: "the straightforward questions done and the harder ones left", area: "AREA2" },
          { text: "work that followed your example very closely", area: "AREA5" },
        ],
      },
      {
        stem: "The last time you asked an early finisher to take it further, they…",
        options: [
          { text: "said they had already finished it", area: "AREA2" },
          { text: "asked you exactly what to do next", area: "AREA5" },
          { text: "waited for you to come and sit with them", area: "AREA4" },
        ],
      },
    ],
  },
  {
    id: "B2",
    statement: "The same few voices answer everything",
    priors: ["AREA6", "AREA2"],
    questions: [
      {
        stem: "In the last question you put to the whole group, the learners who answered were…",
        options: [
          { text: "the same three or four as every week", area: "AREA6" },
          { text: "the ones who find the work easiest", area: "AREA2" },
          { text: "the ones sitting nearest to you", area: "AREA3" },
        ],
      },
      {
        stem: "When one of those regular voices gave an answer, the rest of the group…",
        options: [
          { text: "nodded and moved on without adding anything", area: "AREA6" },
          { text: "waited for you to confirm whether it was right", area: "AREA5" },
          { text: "wrote it down as the answer and stopped there", area: "AREA2" },
        ],
      },
      {
        stem: "The last time you paused after asking a question, in that silence…",
        options: [
          { text: "the same hand went up within two seconds", area: "AREA6" },
          { text: "several learners looked down at their work", area: "AREA4" },
          { text: "someone answered a slightly different question", area: "AREA5" },
        ],
      },
      {
        stem: "When you last asked a quieter learner directly, they…",
        options: [
          { text: "gave a one-word answer and stopped", area: "AREA6" },
          { text: "said they did not know", area: "AREA4" },
          { text: "repeated what had already been said", area: "AREA2" },
        ],
      },
    ],
  },
  {
    id: "B3",
    statement: "Quiet learners get through whole lessons without being heard from",
    priors: ["AREA6", "AREA4"],
    questions: [
      {
        stem: "Think of your last session. The learners you heard nothing from were…",
        options: [
          { text: "the same ones as the week before", area: "AREA6" },
          { text: "learners who work steadily on their own", area: "AREA4" },
          { text: "learners who talk to their neighbour but not to the room", area: "AREA3" },
        ],
      },
      {
        stem: "When you looked at a quiet learner's work at the end of that session, it was…",
        options: [
          { text: "further on than you had expected", area: "AREA6" },
          { text: "started, but thin in places", area: "AREA2" },
          { text: "waiting on an instruction they had missed", area: "AREA4" },
        ],
      },
      {
        stem: "The last time one of those learners did speak, it came after…",
        options: [
          { text: "a direct question from you", area: "AREA4" },
          { text: "a few minutes of talking with a partner", area: "AREA5" },
          { text: "you reading out something they had written", area: "AREA6" },
        ],
      },
      {
        stem: "In the last paired task, the quiet learners you watched…",
        options: [
          { text: "let their partner do the talking", area: "AREA4" },
          { text: "wrote while the other one spoke", area: "AREA6" },
          { text: "finished the exchange quickly and stopped", area: "AREA2" },
        ],
      },
    ],
  },
  {
    id: "B4",
    statement: "Work gets completed, but the thinking is shallow",
    priors: ["AREA2", "AREA5"],
    questions: [
      {
        stem: "Look at the last set of completed work. The answers were…",
        options: [
          { text: "right, with nothing underneath them", area: "AREA2" },
          { text: "very close to the worked example", area: "AREA5" },
          { text: "complete, but nobody had checked them", area: "AREA6" },
        ],
      },
      {
        stem: "When you last asked a learner why their answer worked, they…",
        options: [
          { text: "described the steps they had followed", area: "AREA5" },
          { text: "said it was what you had shown them", area: "AREA2" },
          { text: "went quiet and started rechecking", area: "AREA6" },
        ],
      },
      {
        stem: "The last time learners had to explain their reasoning in writing, most…",
        options: [
          { text: "wrote a single line", area: "AREA2" },
          { text: "described what they did rather than why", area: "AREA5" },
          { text: "left it blank until you prompted them", area: "AREA6" },
        ],
      },
      {
        stem: "When a task had no single right answer, the group…",
        options: [
          { text: "asked what you were looking for", area: "AREA5" },
          { text: "produced answers that were nearly identical", area: "AREA2" },
          { text: "finished unusually quickly", area: "AREA4" },
        ],
      },
    ],
  },
  {
    id: "B5",
    statement: "Learners won't start without checking with me first",
    priors: ["AREA5", "AREA4"],
    questions: [
      {
        stem: "The last time you set a task going, the first thing that happened was…",
        options: [
          { text: "hands up asking whether they had understood it", area: "AREA5" },
          { text: "learners watching a neighbour before starting", area: "AREA4" },
          { text: "nobody writing anything for the first minute", area: "AREA3" },
        ],
      },
      {
        stem: "When a learner checked with you, what they actually wanted was…",
        options: [
          { text: "confirmation they had started it the right way", area: "AREA5" },
          { text: "the instruction saying again", area: "AREA4" },
          { text: "permission to carry on as they were", area: "AREA2" },
        ],
      },
      {
        stem: "The learners who did start straight away were…",
        options: [
          { text: "the ones who had done something similar before", area: "AREA5" },
          { text: "the ones who asked a peer first", area: "AREA4" },
          { text: "the ones copying the layout from the board", area: "AREA6" },
        ],
      },
      {
        stem: "The last time you deliberately did not answer a check-in, the learner…",
        options: [
          { text: "started, and got it broadly right", area: "AREA5" },
          { text: "asked somebody else instead", area: "AREA4" },
          { text: "waited until you came back", area: "AREA2" },
        ],
      },
    ],
  },
  {
    id: "B6",
    statement: "They could do it last week — it's gone now",
    priors: ["AREA5", "AREA1"],
    questions: [
      {
        stem: "The last time you went back to something from a previous unit, learners…",
        options: [
          { text: "recognised the words but not the method", area: "AREA5" },
          { text: "said they had never covered it", area: "AREA1" },
          { text: "got partway through and stalled", area: "AREA6" },
        ],
      },
      {
        stem: "When you asked what they remembered, the answers came back as…",
        options: [
          { text: "fragments in the wrong order", area: "AREA1" },
          { text: "the example you used, rather than the idea", area: "AREA5" },
          { text: "confident and wrong", area: "AREA6" },
        ],
      },
      {
        stem: "Between first teaching it and last session, learners had…",
        options: [
          { text: "not returned to it at all", area: "AREA1" },
          { text: "met it once in a task you set to do at home", area: "AREA6" },
          { text: "used it in a different context", area: "AREA5" },
        ],
      },
      {
        stem: "The learners who had held on to it were…",
        options: [
          { text: "the ones who had used it since", area: "AREA1" },
          { text: "the ones with their notes to hand", area: "AREA6" },
          { text: "the ones who asked questions the first time round", area: "AREA5" },
        ],
      },
    ],
  },
  {
    id: "B7",
    statement: "Phones and side-chat creep in mid-task",
    priors: ["AREA3", "AREA2"],
    questions: [
      {
        stem: "The last time phones came out mid-task, it was…",
        options: [
          { text: "around ten minutes into the activity", area: "AREA3" },
          { text: "just after learners had finished a section", area: "AREA2" },
          { text: "while you were working with another learner", area: "AREA4" },
        ],
      },
      {
        stem: "The learners who drifted first were…",
        options: [
          { text: "the ones who had finished the straightforward part", area: "AREA2" },
          { text: "the ones who had not started", area: "AREA3" },
          { text: "the ones sitting furthest from you", area: "AREA4" },
        ],
      },
      {
        stem: "When you brought the room back, learners…",
        options: [
          { text: "returned quickly, then drifted again", area: "AREA3" },
          { text: "asked what they were meant to be doing", area: "AREA5" },
          { text: "said they had already finished", area: "AREA2" },
        ],
      },
      {
        stem: "At the point drift started, the task was asking learners to…",
        options: [
          { text: "keep going with more of the same", area: "AREA2" },
          { text: "move on to a new step on their own", area: "AREA5" },
          { text: "nothing new — it had been the same for several minutes", area: "AREA3" },
        ],
      },
    ],
  },
  {
    id: "B8",
    statement: "Late arrivals and slow starts",
    priors: ["AREA3", "AREA1"],
    questions: [
      {
        stem: "In your last session, the first ten minutes went on…",
        options: [
          { text: "settling the room and repeating instructions", area: "AREA3" },
          { text: "recapping for the learners who arrived late", area: "AREA1" },
          { text: "equipment, logins and handing things back", area: "AREA6" },
        ],
      },
      {
        stem: "The learners who arrived on time spent that period…",
        options: [
          { text: "sitting with nothing to do", area: "AREA3" },
          { text: "chatting until you started properly", area: "AREA1" },
          { text: "starting something you had left for them", area: "AREA6" },
        ],
      },
      {
        stem: "The late arrivals last session…",
        options: [
          { text: "came in mid-explanation and carried on as normal", area: "AREA3" },
          { text: "asked a neighbour what they were supposed to be doing", area: "AREA1" },
          { text: "started something different from everyone else", area: "AREA4" },
        ],
      },
      {
        stem: "When you did get going, the first thing learners needed was…",
        options: [
          { text: "the point of the session", area: "AREA1" },
          { text: "quiet", area: "AREA3" },
          { text: "last session's work back in front of them", area: "AREA6" },
        ],
      },
    ],
  },
  {
    id: "B9",
    statement: "Learners can't say what they're working on improving",
    priors: ["AREA6", "AREA2"],
    questions: [
      {
        stem: "If you asked three learners now what they are working on improving, you would get…",
        options: [
          { text: "the name of the topic", area: "AREA6" },
          { text: "a grade they are aiming for", area: "AREA2" },
          { text: "nothing specific at all", area: "AREA5" },
        ],
      },
      {
        stem: "The last piece of written feedback you gave, the learner…",
        options: [
          { text: "read it and put it away", area: "AREA6" },
          { text: "asked what mark it was", area: "AREA2" },
          { text: "acted on one part of it", area: "AREA5" },
        ],
      },
      {
        stem: "The last time learners reworked a piece, the changes were…",
        options: [
          { text: "surface corrections", area: "AREA6" },
          { text: "only in the places you had marked", area: "AREA2" },
          { text: "additions rather than revisions", area: "AREA5" },
        ],
      },
      {
        stem: "When learners describe their own progress, they talk about…",
        options: [
          { text: "how much effort they are putting in", area: "AREA2" },
          { text: "how much they have completed", area: "AREA6" },
          { text: "whatever you last said to them", area: "AREA5" },
        ],
      },
    ],
  },
  {
    id: "B10",
    statement: "Learners with support plans wait, depend, or quietly disengage",
    priors: ["AREA4", "AREA5"],
    questions: [
      {
        stem: "The last time a learner with a support plan stalled, they…",
        options: [
          { text: "waited for the support assistant to come round", area: "AREA4" },
          { text: "copied from a neighbour", area: "AREA5" },
          { text: "said they were fine", area: "AREA6" },
        ],
      },
      {
        stem: "The most recent adaptation you made for them was…",
        options: [
          { text: "a shorter version of the same task", area: "AREA4" },
          { text: "more time on the same work", area: "AREA2" },
          { text: "the instructions given again out loud", area: "AREA5" },
        ],
      },
      {
        stem: "When the group last worked independently, those learners…",
        options: [
          { text: "asked no questions at all", area: "AREA4" },
          { text: "produced noticeably less than the others", area: "AREA2" },
          { text: "needed the task reading through with them", area: "AREA5" },
        ],
      },
      {
        stem: "What those learners managed unaided last session was…",
        options: [
          { text: "the first step, and no further", area: "AREA5" },
          { text: "all of it, once someone had started them off", area: "AREA4" },
          { text: "hard to tell from what is in their book", area: "AREA6" },
        ],
      },
    ],
  },
  {
    id: "B11",
    statement: "Learners do not see how today's work connects to what came before",
    priors: ["AREA1", "AREA5"],
    questions: [
      {
        stem: "When you last asked how today linked to the session before, learners…",
        options: [
          { text: "named the topic but not the link", area: "AREA1" },
          { text: "said they had not done that one", area: "AREA6" },
          { text: "described a different lesson entirely", area: "AREA5" },
        ],
      },
      {
        stem: "Looking at their folders, learners seem to treat this unit as…",
        options: [
          { text: "a run of separate tasks", area: "AREA1" },
          { text: "steps towards something they could name", area: "AREA5" },
          { text: "hard to tell — the work is not in order", area: "AREA6" },
        ],
      },
      {
        stem: "At the start of your last session, learners could tell you…",
        options: [
          { text: "what they were doing", area: "AREA1" },
          { text: "why it mattered", area: "AREA5" },
          { text: "neither", area: "AREA6" },
        ],
      },
      {
        stem: "When a task drew on two earlier lessons at once, learners…",
        options: [
          { text: "used one and forgot the other", area: "AREA1" },
          { text: "treated it as something entirely new", area: "AREA5" },
          { text: "asked which method they were supposed to use", area: "AREA6" },
        ],
      },
    ],
  },
  {
    id: "B12",
    statement: "Learners struggle because knowledge assumed from an earlier unit is not there",
    priors: ["AREA1", "AREA6"],
    questions: [
      {
        stem: "The gap that showed up last session was in…",
        options: [
          { text: "a skill taught in an earlier unit", area: "AREA1" },
          { text: "vocabulary you had been using casually", area: "AREA6" },
          { text: "underlying number or reading demands", area: "AREA5" },
        ],
      },
      {
        stem: "You noticed the gap when…",
        options: [
          { text: "learners stalled at one particular step", area: "AREA1" },
          { text: "you marked the work afterwards", area: "AREA6" },
          { text: "a learner said outright that they could not do it", area: "AREA4" },
        ],
      },
      {
        stem: "The learners with that gap were…",
        options: [
          { text: "most of the group", area: "AREA1" },
          { text: "a handful of individuals", area: "AREA6" },
          { text: "learners who joined the course later", area: "AREA4" },
        ],
      },
      {
        stem: "Before that task, the last time that knowledge was checked was…",
        options: [
          { text: "at the end of the earlier unit", area: "AREA6" },
          { text: "not since it was first taught", area: "AREA1" },
          { text: "informally, in discussion", area: "AREA5" },
        ],
      },
    ],
  },
];

export interface Target {
  id: string;
  text: string;
  reflections: [string, string, string];
}

const AGREE = " I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working.";

export const TARGETS: Record<AreaId, Target[]> = {
  AREA1: [
    {
      id: "A1T1",
      text:
        "In Launch and Establish, I will develop how each session is placed within the wider course story, so that learners can say what today builds on and what it is preparing them for." +
        AGREE,
      reflections: [
        "If a learner opened their folder at random, what would tell them where they are in the course?",
        "What do you assume learners carry between one session and the next?",
        "Which link in this unit is the one learners most often miss?",
      ],
    },
    {
      id: "A1T2",
      text:
        "In Establish and Apply, I will develop how prior learning is deliberately revisited across a unit, so that earlier knowledge is still available to learners when a later task depends on it." +
        AGREE,
      reflections: [
        "Which piece of earlier learning does everything later in this unit rest on?",
        "How long is the gap between teaching something and needing it again?",
        "What tells you knowledge has faded before a task exposes it?",
      ],
    },
    {
      id: "A1T3",
      text:
        "In Launch and Demonstrate, I will develop the order and pacing of content across the unit, so that learners meet ideas in a sequence that makes each new demand reachable from what they already hold." +
        AGREE,
      reflections: [
        "Where in this unit do learners take the biggest jump in one step?",
        "What would you have to move to make that jump smaller?",
        "Which content is in its current position out of habit rather than design?",
      ],
    },
  ],
  AREA2: [
    {
      id: "A2T1",
      text:
        "In Apply and Demonstrate, I will develop the level of demand learners meet once the core task is secure, so that finishing early leads to harder thinking rather than waiting, helping or switching off." +
        AGREE,
      reflections: [
        "What does a learner who finishes ten minutes early actually do next?",
        "Who in this group has not been stuck for a while?",
        "What would make the extra work feel like the point rather than a reward?",
      ],
    },
    {
      id: "A2T2",
      text:
        "In Establish and Apply, I will develop what counts as a finished piece of work in this subject, so that learners produce depth, reasoning and justification rather than answers that are complete but thin." +
        AGREE,
      reflections: [
        "What does your strongest learner's work look like, and who else has seen it?",
        "When did a learner last change their mind about an answer?",
        "What are learners currently allowed to leave out?",
      ],
    },
    {
      id: "A2T3",
      text:
        "In Launch and Demonstrate, I will develop how ambition is communicated to this group, so that learners describe their goals in terms of what they can do rather than what they have completed." +
        AGREE,
      reflections: [
        "Whose expectations are learners currently working to?",
        "What would a learner say if you asked what good looks like here?",
        "Which learners have quietly settled for enough?",
      ],
    },
  ],
  AREA3: [
    {
      id: "A3T1",
      text:
        "In Launch and Apply, I will develop how learners begin and sustain purposeful learning activity, so that slow starts and mid-task drift take less time away from the session." +
        AGREE,
      reflections: [
        "Which minutes of your session currently belong to nobody?",
        "What are learners doing in the first sixty seconds after they arrive?",
        "When drift starts, what is the task asking of them at that moment?",
      ],
    },
    {
      id: "A3T2",
      text:
        "In Establish and Apply, I will develop the routines and expectations operating in this group, so that learners respond consistently without needing the room brought back more than once in a session." +
        AGREE,
      reflections: [
        "Which of your expectations do learners follow without being reminded?",
        "What happens in the ten seconds after you ask for attention?",
        "Which routine would you miss most if it disappeared?",
      ],
    },
    {
      id: "A3T3",
      text:
        "In Apply and Demonstrate, I will develop how learners take responsibility for their own attention and conduct, so that focus during independent work depends less on where I am standing." +
        AGREE,
      reflections: [
        "What do learners do when you are at the other side of the room?",
        "Who decides when a learner is off task at the moment?",
        "What would learners say the rules are for?",
      ],
    },
  ],
  AREA4: [
    {
      id: "A4T1",
      text:
        "In Establish and Apply, I will develop how learners with additional needs access the same ambitious work as their peers, so that they begin independently rather than waiting to be started." +
        AGREE,
      reflections: [
        "Which learner waited longest last session before doing anything?",
        "What is the first barrier they meet in a typical task?",
        "What are they capable of that the current task does not ask for?",
      ],
    },
    {
      id: "A4T2",
      text:
        "In Apply and Demonstrate, I will develop how support around individual learners is used and withdrawn, so that dependence on an adult reduces and learners show what they can do unaided." +
        AGREE,
      reflections: [
        "What has a supported learner done entirely alone this term?",
        "Who else in the room could they turn to first?",
        "What would fading support look like over the next six weeks?",
      ],
    },
    {
      id: "A4T3",
      text:
        "In Launch and Establish, I will develop how every learner participates in the spoken and shared work of the session, so that no learner passes through an hour without contributing." +
        AGREE,
      reflections: [
        "Who did you not hear from last session, and the one before?",
        "What makes speaking in this room feel risky?",
        "Which learners are quiet, and which are actually absent from the work?",
      ],
    },
  ],
  AREA5: [
    {
      id: "A5T1",
      text:
        "In Launch and Establish, I will develop how key ideas in my subject are explained and modelled, so that learners hold the underlying concept rather than reproducing the example they were shown." +
        AGREE,
      reflections: [
        "Which idea do learners get right in your example and wrong everywhere else?",
        "What does an expert notice here that a learner does not?",
        "What would you take away from your model to see whether they understand it?",
      ],
    },
    {
      id: "A5T2",
      text:
        "In Apply and Demonstrate, I will develop how learners practise and transfer subject knowledge, so that they can start unfamiliar tasks without first checking whether they have understood." +
        AGREE,
      reflections: [
        "What does a learner need in front of them to begin without asking?",
        "How different is the practice task from the one you modelled?",
        "What are learners really asking for when they check with you?",
      ],
    },
    {
      id: "A5T3",
      text:
        "In Establish and Apply, I will develop the subject-specific misconceptions I plan for in this group, so that recurring errors are anticipated and addressed rather than discovered in finished work." +
        AGREE,
      reflections: [
        "Which wrong answer do you see every year in this topic?",
        "What does that error tell you about what learners believe?",
        "Where would you have to look to catch it earlier?",
      ],
    },
  ],
  AREA6: [
    {
      id: "A6T1",
      text:
        "In Establish and Apply, I will develop how I find out what every learner understands during the session, so that gaps surface while there is still time to act on them rather than at marking." +
        AGREE,
      reflections: [
        "Whose understanding did you actually see last session, and whose did you assume?",
        "At what point in the hour would knowing have changed what you did?",
        "What are you currently using completion to stand in for?",
      ],
    },
    {
      id: "A6T2",
      text:
        "In Apply and Demonstrate, I will develop how learners engage with and act on feedback, so that they can say what they are working on improving and show where they have changed their work." +
        AGREE,
      reflections: [
        "What happens to your feedback in the ten minutes after learners receive it?",
        "Which learner could name their next step right now?",
        "When did a learner last redraft something for a reason other than being told to?",
      ],
    },
    {
      id: "A6T3",
      text:
        "In Launch and Establish, I will develop how questioning draws responses from the whole group, so that participation is not concentrated in the same few voices session after session." +
        AGREE,
      reflections: [
        "Who answered your questions last session, and how do you know?",
        "What happens in the silence after you ask something?",
        "What is a hand up currently telling you?",
      ],
    },
  ],
};

export const FORM_BASE =
  "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=7ACxezLnGEGVoPw4WOs6XsPATjPLlsFLkgDBsoQJl3tURDJYWTJDREdKOVo2MDFKS05JM1gzVEZWRiQlQCNjPTEu";

export function buildFormUrl(areaName: string, targetText: string) {
  return (
    FORM_BASE +
    "&r201037595f474987ab68489c6f24e60e=" +
    encodeURIComponent(`"${areaName}"`) +
    "&rf9807d1c59fa41239009427d48fa12e8=" +
    encodeURIComponent(targetText)
  );
}
