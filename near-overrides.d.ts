// near-overrides.d.ts
declare module '@near-js/wallet-account/lib/near' {
    import { Connection } from '@near-js/accounts/lib/connection';
    export interface Near {
      connection: Connection & { getConnection?: () => any };
    }
  }
  