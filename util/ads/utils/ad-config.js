export const adConfig = ({
  pos,
  context,
  slotName,
  id,
  dimensions = [
    [
      [300, 250],
      [660, 470],
    ],
    [
      [660, 470],
      [771, 420],
    ],
    [300, 250],
  ],
}) => {
  return {
    targeting: {
      pos,
      context,
    },
    id,
    slotName: slotName || 'r7home/home',
    sizemap: {
      breakpoints: [
        [992, 0],
        [768, 0],
        [0, 0],
      ],
      refresh: true,
    },
    dimensions,
    bidding: {
      prebid: {
        enabled: true,
        bids: [],
      },
      amazon: {
        enabled: true,
      },
    },
  }
}
