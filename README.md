# Target Navigator

Build a standalone web app called Behaviour First Target Picker. It runs entirely client-side — no backend, no database, no API calls. British English throughout, and use "learners" rather than "students" in all interface text.

Purpose. A tutor names what they're seeing in one of their classes, answers six questions about specific incidents, and the app identifies which one of six areas of practice their development target should sit in. It offers three broad targets in that area. They pick one, see some reflective questions, then click through to a Microsoft Form which opens with their target already filled in.

No data is saved by this app. All capture happens in the Microsoft Form at the end.

Design principle for every question. Options describe what learners did, said, produced or failed to produce — observable things. Never ask the tutor to rate their own teaching, planning or consistency. Within any set of three options none should read as the obviously "good teacher" answer. Concrete, incident-anchored, second person, no jargon.

The six areas. Internally tag AREA1–AREA6; codes must never appear in the interface.

Curriculum intent and sequencing

High expectations, stretch and challenge

Behaviour and attitudes

Inclusion and SEND

Subject expertise and pedagogy

Formative assessment

Screen flow

Welcome — no form fields at all. Just a heading and a short intro: this activity helps you find the area your RAISE target should sit in; you'll answer a few questions about what you notice in one group you teach; it takes about five minutes; at the end you'll get a suggested target to take into the RAISE Target Setting form. One Start button.

Behaviours — twelve statements as selectable cards, pick three to five. Continue unlocks at three, caps at five.

Focal choice — pick the one that matters most from their own shortlist. The app auto-selects a secondary behaviour from the remaining ones: the lowest-numbered.

Questions — six: all four from the focal behaviour, then the first two from the secondary. Show "Question N of 6".

Evidence — required free text, prompted with the focal statement: "You said: [statement] — describe the last time this happened." Optional notes box below.

Context — two required single-selects on one screen, neither contributing to scoring. "How often does this happen with this group?" (Every session / Most sessions / Occasionally). "When this happens, which learners is it mostly?" (The same few individuals every time / A shifting mix, different learners each session / Most of the group at once).

Close call — only when the margin is 2 or less. Show the top two areas side by side with their descriptions; the tutor picks which fits better.

Targets — area name, its description, "What good looks like", then three target cards to choose from.

Reflection — show the chosen target in a highlighted panel, then the three reflective questions for that specific target under a line reading: "You don't need to answer these now — they're worth sitting with before you meet your Innovator." Then a prominent button: "Open the RAISE Target Setting form".

The behaviours and their prior weightings. Each selected behaviour contributes 1 point to each area listed.

B1 Some learners finish early, then switch off → AREA2, AREA6
B2 The same few voices answer everything → AREA6, AREA2
B3 Quiet learners get through whole lessons without being heard from → AREA6, AREA4
B4 Work gets completed, but the thinking is shallow → AREA2, AREA5
B5 Learners won't start without checking with me first → AREA5, AREA4
B6 They could do it last week — it's gone now → AREA5, AREA1
B7 Phones and side-chat creep in mid-task → AREA3, AREA2
B8 Late arrivals and slow starts → AREA3, AREA1
B9 Learners can't say what they're working on improving → AREA6, AREA2
B10 Learners with support plans wait, depend, or quietly disengage → AREA4, AREA5
B11 Learners do not see how today's work connects to what came before → AREA1, AREA5
B12 Learners struggle because knowledge assumed from an earlier unit is not there → AREA1, AREA6

Show the statements only — never the B codes.

Questions. Four per behaviour, forty-eight total. Three options each, each option tagged to a different area, weighted towards that behaviour's prior areas but not confined to them. Match this voice exactly:

"Think of the last task where someone finished early. When they finished, they…" — sat quietly until you reached them (AREA6) / glanced at the extension and did the minimum of it (AREA2) / started helping the person next to them (AREA4).

Scoring. Priors 1 point per area per selected behaviour. Focal answers 3 points each. Secondary answers 1 point each. Highest total wins. Ties break on focal-answer subtotal, then this fixed order: AREA6, AREA2, AREA5, AREA4, AREA1, AREA3. If the winner beats the runner-up by 2 or less, show the close-call screen; otherwise go straight to targets.

Area descriptions and "what good looks like" — write one observational paragraph (~30 words) per area describing what the tutor is likely seeing, not what they're doing wrong, plus one sentence on what strong practice looks like there.

Targets — three per area, eighteen total. Broad: each names the practice to develop and the learner outcome, but deliberately not the technique. Roughly 40–50 words, anchored to LEAD phases (Launch, Establish, Apply, Demonstrate), each ending with the line about agreeing specifics with a Learning Innovator. This is the register:

"In Launch and Apply, I will develop how learners begin and sustain purposeful learning activity, so that slow starts and mid-task drift take less time away from the session. I will agree with my Learning Innovator what this looks like in my subject, and how we will know it is working."

Reflective questions — three per target, eighteen sets, shown only for the target the tutor chose. Open, specific to that target, no right answers. This is the register, for the Behaviour and attitudes target above: Which minutes of your session currently belong to nobody? / What are learners doing in the first sixty seconds after they arrive? / When drift starts, what is the task asking of them at that moment?

The form button. Build a link to the Microsoft Form with the target area and target text prefilled, and open it in a new tab. Base:

https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=7ACxezLnGEGVoPw4WOs6XsPATjPLlsFLkgDBsoQJl3tURDJYWTJDREdKOVo2MDFKS05JM1gzVEZWRiQlQCNjPTEu

Append two parameters, both URL-encoded with encodeURIComponent:

&r201037595f474987ab68489c6f24e60e= followed by the area name wrapped in double quotes — the quotes must be encoded as %22 and are required for the choice to match, e.g. %22Behaviour%20and%20attitudes%22

&rf9807d1c59fa41239009427d48fa12e8= followed by the full target text, encoded, with no quotes.

Do not prefill anything else — name and department are answered by the member of staff.

Below the button add a short line: "Your target will already be filled in. You just need to add your name and department."

Never expose area codes, tags, scores or margins in the interface.

Visual direction. Clean and calm, professional rather than playful. Serif display face for headings against a sans body face. Deep navy-to-slate palette with one warmer accent for selected states. Cards with generous padding and a clear selected state. Gentle fade between steps. Mobile-first — this will be opened on phones during a team meeting.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://target-finder-flash.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7104a052-ff31-4653-8b2b-bc31a18de99e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
