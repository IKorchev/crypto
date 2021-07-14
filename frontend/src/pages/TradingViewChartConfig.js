export const marketProps = {
  colorTheme: "dark",
  dateRange: "12M",
  showChart: true,
  locale: "en",
  width: "100%",
  height: "100%",
  largeChartUrl: "",
  isTransparent: false,
  showSymbolLogo: true,
  plotLineColorGrowing: "rgba(41, 98, 255, 1)",
  plotLineColorFalling: "rgba(41, 98, 255, 1)",
  gridLineColor: "rgba(42, 46, 57, 0)",
  scaleFontColor: "rgba(120, 123, 134, 1)",
  belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
  belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
  belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
  belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
  symbolActiveColor: "rgba(41, 98, 255, 0.12)",
  tabs: [
    {
      title: "Cryptocurrency market",
      symbols: [
        {
          s: "BINANCE:BTCUSDT",
        },
        {
          s: "BINANCE:ETHUSDT",
        },
        {
          s: "BINANCE:BNBUSDT",
        },
        {
          s: "BINANCE:ADAUSDT",
        },
        {
          s: "BINANCE:XRPUSDT",
        },
        {
          s: "BINANCE:DOGEUSDT",
        },
        {
          s: "BINANCE:DOTUSDT",
        },
        {
          s: "BINANCE:UNIUSDT",
        },
      ],
      originalTitle: "Cryptocurrency market",
    },
    {
      title: "Commodities",
      symbols: [
        { s: "CME_MINI:ES1!", d: "S&P 500" },
        { s: "CME:6E1!", d: "Euro" },
        { s: "COMEX:GC1!", d: "Gold" },
        { s: "NYMEX:CL1!", d: "Crude Oil" },
        { s: "NYMEX:NG1!", d: "Natural Gas" },
        { s: "CBOT:ZC1!", d: "Corn" },
      ],
      originalTitle: "Commodities",
    },
    {
      title: "Bonds",
      symbols: [
        { s: "CME:GE1!", d: "Eurodollar" },
        { s: "CBOT:ZB1!", d: "T-Bond" },
        { s: "CBOT:UB1!", d: "Ultra T-Bond" },
        { s: "EUREX:FGBL1!", d: "Euro Bund" },
        { s: "EUREX:FBTP1!", d: "Euro BTP" },
        { s: "EUREX:FGBM1!", d: "Euro BOBL" },
      ],
      originalTitle: "Bonds",
    },
    {
      title: "Forex",
      symbols: [
        { s: "FX:EURUSD" },
        { s: "FX:GBPUSD" },
        { s: "FX:USDJPY" },
        { s: "FX:USDCHF" },
        { s: "FX:AUDUSD" },
        { s: "FX:USDCAD" },
      ],
      originalTitle: "Forex",
    },
  ],
}
