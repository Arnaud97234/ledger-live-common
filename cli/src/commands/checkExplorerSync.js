// @flow

import { map } from "rxjs/operators";
import { accountFormatters } from "@ledgerhq/live-common/lib/account";
import { scan, scanCommonOpts } from "../scan";
import type { ScanCommonOpts } from "../scan";
import { execSync } from "child_process";

export default {
  description: "Compare Ledger Live Explorer sync against third party explorer",
  args: [...scanCommonOpts],
  job: (opts: ScanCommonOpts) => {
    const llExplorerSync = scan(opts).pipe(
      map((account) => accountFormatters.json(account))
    );
    console.log(scanCommonOpts);
    execSync(
      `node node_modules/@ledgerhq/xpub-scan/build/scan.js ${scanCommonOpts} -a 0`
    );
  },
};
