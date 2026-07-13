import { Composition } from 'remotion';
import { Video1Social } from './compositions/Video1Social';
import { Video2Walkthrough } from './compositions/Video2Walkthrough';
import { Video3Shorts } from './compositions/Video3Shorts';
import { PainstackVideo } from './compositions/Video4Product';
import { Video4Social } from './compositions/Video4Social';
import { LWEvidence } from './compositions/VideoLW/LWEvidence';
import { LWAgents } from './compositions/VideoLW/LWAgents';
import { LWCTOWorkspace } from './compositions/VideoLW/LWCTOWorkspace';
import { LWDataroom } from './compositions/VideoLW/LWDataroom';
import { LWReddit } from './compositions/VideoLW/LWReddit';


export const RemotionRoot = () => {
  return (
    <>
      {/* VIDEO 1: 30s Social Launch — X, LinkedIn */}
      <Composition
        id="PainstackV2-Social"
        component={Video1Social}
        durationInFrames={1216}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* VIDEO 2: 60s Walkthrough — LinkedIn, Landing Page */}
      <Composition
        id="PainstackV2-Walkthrough"
        component={Video2Walkthrough}
        durationInFrames={2213}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* VIDEO 3: 15s Reels/Shorts — Vertical */}
      <Composition
        id="PainstackV2-Shorts"
        component={Video3Shorts}
        durationInFrames={632}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* VIDEO 4: 92s Product — Stitch-Calibrated Dialogue */}
      <Composition
        id="PainstackV3-Product"
        component={PainstackVideo}
        durationInFrames={3180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="PainstackV4-Social"
        component={Video4Social}
        durationInFrames={2100}
        fps={60}
        width={1920}
        height={1080}
      />

      <Composition
        id="PainstackV4-SocialVertical"
        component={Video4Social}
        durationInFrames={2100}
        fps={60}
        width={1080}
        height={1920}
      />

      {/* ── LAUNCH WEEK ─────────────────────────────────────── */}

      {/* LW Day 1 — Evidence Hub */}
      <Composition id="PainstackLW-Evidence" component={LWEvidence}
        durationInFrames={900} fps={30} width={1080} height={1920} />
      <Composition id="PainstackLW-Evidence-16x9" component={LWEvidence}
        durationInFrames={900} fps={30} width={1920} height={1080} />

      {/* LW Day 2 — AI Agents */}
      <Composition id="PainstackLW-Agents" component={LWAgents}
        durationInFrames={990} fps={30} width={1080} height={1920} />
      <Composition id="PainstackLW-Agents-16x9" component={LWAgents}
        durationInFrames={990} fps={30} width={1920} height={1080} />

      {/* LW Day 3 — CTO Workspace */}
      <Composition id="PainstackLW-CTOWorkspace" component={LWCTOWorkspace}
        durationInFrames={900} fps={30} width={1080} height={1920} />
      <Composition id="PainstackLW-CTOWorkspace-16x9" component={LWCTOWorkspace}
        durationInFrames={900} fps={30} width={1920} height={1080} />

      {/* LW Day 4 — Dataroom */}
      <Composition id="PainstackLW-Dataroom" component={LWDataroom}
        durationInFrames={900} fps={30} width={1080} height={1920} />
      <Composition id="PainstackLW-Dataroom-16x9" component={LWDataroom}
        durationInFrames={900} fps={30} width={1920} height={1080} />

      {/* LW Day 5 — Reddit → Blueprint */}
      <Composition id="PainstackLW-Reddit" component={LWReddit}
        durationInFrames={840} fps={30} width={1080} height={1920} />
      <Composition id="PainstackLW-Reddit-16x9" component={LWReddit}
        durationInFrames={840} fps={30} width={1920} height={1080} />
    </>
  );
};
