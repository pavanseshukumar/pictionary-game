# Pictionary Party

A local, offline-friendly party game for friends drawing in the same room. One shared phone runs the board, dice, word cards, timer and scores. Players draw on real paper.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Modes

- **Classic Board**: guess correctly to roll the die and move along a winding board. Your space sets your next category, and the first team to the finish wins.
- **Quick Play**: no board. Teams alternate for a set number of rounds and the most points wins.

## Project layout

| Path | What lives there |
| --- | --- |
| `app/` | Routes: `/`, `/setup`, `/play`, `/how-to-play`, `/settings` |
| `components/{home,setup,game,board,scoreboard,results,settings,shared}` | UI only |
| `lib/game-engine/` | Pure turn rules (`engine.js`), board generation, wall-clock timer, end-of-game stats |
| `lib/scoring/` | All point values and ranking rules. Change house rules here |
| `lib/word-bank/` | Word selection: filtering, no repeats, graceful fallbacks, custom words |
| `lib/storage/` | Versioned, validated `localStorage` persistence |
| `lib/store/` | `useSyncExternalStore` stores shared by every route |
| `data/` | Word database (288 words), categories, team colours |
| `types/game.js` | JSDoc typedefs: `GameSession`, `Team`, `GameTurn`, `Word`, `BoardSpace`, `GameSettings`… |

The engine contains no React code. Each transition takes a session and returns the next one, with `now` and `rng` injected. The UI renders whichever screen `session.phase` names, so a refresh resumes exactly where you left off. The timer stores timestamps rather than a countdown, so it stays accurate when the tab is backgrounded or reloaded.

## Adding words

Add entries to the right category and difficulty group in `data/words.js`. IDs come from category + text, so keep text unique within a category. Hosts can also add their own words in **Settings**.
