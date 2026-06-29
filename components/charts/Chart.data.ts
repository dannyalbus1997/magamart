import { alpha, Theme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { ChartType } from "./Chart.interface";
import { getThemeColor, pxToRem } from "@shared/utils";

export const areaChartSeries = [
  {
    name: "Total Leads",
    data: [
      580, 620, 550, 680, 620, 720, 650, 780, 700, 850, 780, 920,
      820, 750, 880, 800, 920, 850, 980, 900, 820, 920, 850, 780,
      720, 800, 750, 880, 820, 950, 880, 1020, 920, 850, 780, 720,
      680, 750, 700, 820, 780, 880, 820, 920, 850, 780, 720, 680,
      720, 800, 750, 850, 780, 920, 850, 950, 880, 820, 750, 680,
      620, 700, 650, 780, 720, 850, 780, 520, 580, 520, 480, 550,
    ],
  },
  {
    name: "Approved",
    data: [
      420, 450, 400, 480, 440, 520, 470, 550, 500, 580, 540, 620,
      580, 520, 600, 550, 620, 580, 650, 600, 560, 620, 580, 540,
      500, 550, 520, 600, 560, 640, 600, 680, 620, 580, 540, 500,
      480, 520, 490, 560, 530, 600, 560, 620, 580, 540, 500, 480,
      500, 550, 520, 580, 540, 620, 580, 640, 600, 560, 520, 480,
      450, 500, 470, 540, 500, 580, 540, 380, 420, 380, 350, 400,
    ],
  },
  {
    name: "Rejected",
    data: [
      260, 290, 250, 320, 280, 360, 310, 380, 340, 400, 360, 420,
      380, 340, 400, 360, 420, 380, 450, 400, 370, 420, 380, 350,
      320, 360, 340, 400, 370, 430, 400, 460, 420, 380, 340, 310,
      290, 340, 310, 370, 340, 400, 370, 420, 380, 350, 320, 290,
      310, 360, 330, 390, 360, 420, 380, 440, 400, 370, 330, 300,
      270, 320, 290, 360, 330, 390, 350, 250, 280, 250, 230, 270,
    ],
  },
];

export const areaChartOptions: Partial<ApexOptions> = {
  chart: {
    type: "area",
    stacked: false,
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  colors: ["#8B5CF6", "#22C55E", "#EF4444"],
  dataLabels: { enabled: false },
  stroke: {
    curve: "monotoneCubic",
    width: 3,
    colors: ["#8B5CF6", "#22C55E", "#EF4444"],
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 90, 100],
    },
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "right",
    floating: false,
    fontSize: "13px",
    fontWeight: 500,
    markers: { size: 8, shape: "circle" },
    itemMargin: { horizontal: 12, vertical: 0 },
  },
  xaxis: {
    categories: [
      "Jan", "", "", "", "", "",
      "Feb", "", "", "", "", "",
      "Mar", "", "", "", "", "",
      "Apr", "", "", "", "", "",
      "May", "", "", "", "", "",
      "Jun", "", "", "", "", "",
      "Jul", "", "", "", "", "",
      "Aug", "", "", "", "", "",
      "Sep", "", "", "", "", "",
      "Oct", "", "", "", "", "",
      "Nov", "", "", "", "", "",
      "Dec", "", "", "", "", "",
    ],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      style: { colors: "#9CA3AF", fontSize: "12px" },
      rotate: 0,
      hideOverlappingLabels: true,
    },
  },
  yaxis: {
    min: 0,
    max: 1400,
    tickAmount: 7,
    labels: {
      style: { colors: "#9CA3AF", fontSize: "12px" },
      formatter: (value: number) => {
        if (value >= 1000) {
          return (
            (value / 1000).toFixed(1).replace(".0", "") +
            "," +
            "000".slice(0, 3 - Math.floor(value / 1000).toString().length + 1)
          );
        }
        return value.toString();
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#E5E7EB",
    strokeDashArray: 0,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
  },
  tooltip: {
    shared: true,
    intersect: false,
    x: {
      formatter: (val: number, opts?: any) => {
        const categories = [
          "Jan", "", "", "", "", "",
          "Feb", "", "", "", "", "",
          "Mar", "", "", "", "", "",
          "Apr", "", "", "", "", "",
          "May", "", "", "", "", "",
          "Jun", "", "", "", "", "",
          "Jul", "", "", "", "", "",
          "Aug", "", "", "", "", "",
          "Sep", "", "", "", "", "",
          "Oct", "", "", "", "", "",
          "Nov", "", "", "", "", "",
          "Dec", "", "", "", "", "",
        ];
        const currentYear = new Date().getFullYear();
        const dataPointIndex = opts?.dataPointIndex ?? val ?? 0;
        for (let i = dataPointIndex; i >= 0; i--) {
          if (categories[i] && categories[i].trim() !== "") {
            return `${categories[i]} ${currentYear}`;
          }
        }
        return "";
      },
    },
    y: { formatter: (value: number) => value.toString() },
  },
};

export const labelXYStyles = (theme: Theme) => ({
  style: {
    fontSize: pxToRem(14),
    fontWeight: 400,
    colors: theme.palette.grey[400],
  },
});

export const cssStyles = (theme: Theme) => {
  return {
    bgBlur: (props?: { color?: string; blur?: number; opacity?: number }) => {
      const color = props?.color ?? theme?.palette?.background?.default;
      const blur = props?.blur ?? 6;
      const opacity = props?.opacity ?? 0.8;
      return {
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      };
    },
  };
};

export const getFillColors = (theme: Theme, fill?: any[]) => {
  const colors = fill?.map((color) => getThemeColor(theme, color));
  return colors;
};

export const barOptions = (
  theme: Theme,
  type: ChartType,
  options: Partial<ApexOptions>,
  isThemeColors: boolean = true,
): ApexOptions | any => {
  const {
    chart,
    grid,
    plotOptions,
    xaxis,
    yaxis,
    fill,
    dataLabels,
    stroke,
    legend,
    ...restOptions
  } = options;

  const fillColors = isThemeColors
    ? fill?.colors
    : getFillColors(theme, fill?.colors);

  return {
    chart: {
      type,
      toolbar: { show: false },
      zoom: { enabled: false },
      ...chart,
    },
    grid: {
      show: true,
      borderColor: theme.palette.grey[600],
      ...grid,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
      ...plotOptions,
    },
    xaxis: {
      labels: {
        ...labelXYStyles(theme),
        ...xaxis?.labels,
      },
      axisTicks: { show: false },
      axisBorder: { show: false },
      ...xaxis,
    },
    yaxis: {
      labels: { ...labelXYStyles(theme) },
      ...yaxis,
    },
    fill: {
      opacity: 1,
      ...fill,
      colors: fillColors,
    },
    dataLabels: {
      enabled: false,
      ...dataLabels,
    },
    stroke: {
      show: true,
      width: 1,
      colors: [theme.palette.common.white],
      ...stroke,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: "bottom",
      markers: { ...legend?.markers },
      ...legend,
    },
    ...restOptions,
  };
};
