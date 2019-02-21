import { OfferDataModule } from './offer-data.module';

describe('OfferDataModule', () => {
  let offerDataModule: OfferDataModule;

  beforeEach(() => {
    offerDataModule = new OfferDataModule();
  });

  it('should create an instance', () => {
    expect(offerDataModule).toBeTruthy();
  });
});
