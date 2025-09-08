import { AgChartsEnterpriseModule } from "ag-charts-enterprise";
import { ModuleRegistry } from "ag-grid-community";
import {
  AllEnterpriseModule,
  IntegratedChartsModule,
  LicenseManager,
} from "ag-grid-enterprise";

export function setAgGridLicense() {
  const key = import.meta.env.VITE_AG_GRID_LICENSE_KEY;
  if (key) {
    LicenseManager.setLicenseKey(key);
  } else {
    if (import.meta.env.DEV) {
      console.warn(
        "AG Grid license key missing. Set VITE_AG_GRID_LICENSE_KEY in .env"
      );
    }
  }
}

export function registerAgGridModules() {
  ModuleRegistry.registerModules([
    AllEnterpriseModule,
    IntegratedChartsModule.with(AgChartsEnterpriseModule),
  ]);
}
