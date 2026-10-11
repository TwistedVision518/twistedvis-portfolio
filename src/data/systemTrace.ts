export type TraceTone = 'blue' | 'ochre' | 'red' | 'green';

export type SystemTraceStage = {
  id: string;
  label: string;
  summary: string;
  explanation: string;
  evidenceHref: string;
  evidenceLabel: string;
  durationMs: number;
  tone: TraceTone;
};

export const systemTrace = [
  {
    id: 'source',
    label: 'source / project',
    summary: 'Project Aerodactyl',
    explanation: 'An interactive release hub turns custom ROM work into a clear handoff for people who flash the builds.',
    evidenceHref: 'https://github.com/TwistedVision518/project-aerodactyl',
    evidenceLabel: 'open release hub source',
    durationMs: 2200,
    tone: 'blue',
  },
  {
    id: 'device-tree',
    label: 'device tree',
    summary: 'Aerodactyl',
    explanation: 'Common device-tree configuration connects the Nothing Phone (2a) and 2a Plus build family.',
    evidenceHref: 'https://github.com/LunarisPacman/android_device_nothing_Aerodactyl',
    evidenceLabel: 'open device tree',
    durationMs: 2200,
    tone: 'ochre',
  },
  {
    id: 'kernel',
    label: 'kernel',
    summary: 'build surface',
    explanation: 'The same device path continues into a dedicated kernel repository for the Aerodactyl build family.',
    evidenceHref: 'https://github.com/LunarisPacman/android_device_nothing_Aerodactyl-kernel',
    evidenceLabel: 'open kernel source',
    durationMs: 2200,
    tone: 'red',
  },
  {
    id: 'framework',
    label: 'framework',
    summary: 'UDFPS behavior',
    explanation: 'Framework code carries device-specific behavior, including a MediaTek UDFPS dimlayer reversal patch.',
    evidenceHref: 'https://github.com/TwistedVision518/android_frameworks_base-nothing2a-udfps',
    evidenceLabel: 'open framework patch',
    durationMs: 2200,
    tone: 'blue',
  },
  {
    id: 'linux',
    label: 'linux',
    summary: 'Odysee',
    explanation: 'Away from Android, the same systems mindset becomes an automated Arch Linux install flow.',
    evidenceHref: 'https://github.com/TwistedVision518/Odysee',
    evidenceLabel: 'open Linux installer',
    durationMs: 2200,
    tone: 'green',
  },
  {
    id: 'security',
    label: 'security',
    summary: 'L.I.E.S.',
    explanation: 'Network visibility becomes a product surface through real-time traffic analysis and threat detection.',
    evidenceHref: 'https://github.com/TwistedVision518/L.I.E.S',
    evidenceLabel: 'open security tool',
    durationMs: 2200,
    tone: 'red',
  },
  {
    id: 'release',
    label: 'release',
    summary: 'source → user',
    explanation: 'Release infrastructure makes the work legible after the close-to-metal layer is done.',
    evidenceHref: 'https://project-aerodactyl.netlify.app',
    evidenceLabel: 'open live release hub',
    durationMs: 2200,
    tone: 'ochre',
  },
  {
    id: 'maintainer',
    label: 'maintainer signal',
    summary: 'systems with personality',
    explanation: 'The through-line is a maintainer who moves between platform code, Linux, security, and useful interfaces.',
    evidenceHref: 'https://github.com/TwistedVision518',
    evidenceLabel: 'open GitHub profile',
    durationMs: 2200,
    tone: 'blue',
  },
] as const satisfies readonly SystemTraceStage[];
