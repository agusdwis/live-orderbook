// The ticker channel provides real-time price updates every time a match happens.
// It batches updates in case of cascading matches, greatly reducing bandwidth requirements.
const TICKER = 'ticker';

export default TICKER;
