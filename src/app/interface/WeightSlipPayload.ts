export interface weightSlipPayload {
  address: string;
  vehicleNumber: string;
  grossWeight: number;
  tareWeight: number;
  grossWeightDate: Date;
  tareWeightDate: Date;
  checked: boolean;
}
