import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  MenuItem,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useCurrencies } from "@/hooks/useCurrencies";
import {
  useInternationalRates,
  INTERNATIONAL_CURRENCIES,
} from "@/hooks/useInternationalRates";
import {
  convertLocalPivot,
  convertInternational,
  findLocalCurrency,
} from "@/utils/currencyConversion";
import { format } from "numerable";
import { es } from "numerable/locale";
import { hapticFeedback } from "@/utils/haptics";
import { useTheme } from "@mui/material";

interface InternationalCalculatorProps {
  initialLocalSource?: string;
  initialLocalTarget?: string;
}

const InternationalCalculator = ({
  initialLocalSource = "Dolar Blue",
  initialLocalTarget = "Peso Argentino",
}: InternationalCalculatorProps) => {
  const theme = useTheme();
  const [mode, setMode] = useState<"local" | "international">("local");
  const { currencies: localCurrencies } = useCurrencies();

  // Local State
  const [localSource, setLocalSource] = useState(initialLocalSource);
  const [localTarget, setLocalTarget] = useState(initialLocalTarget);

  useEffect(() => {
    if (initialLocalSource) setLocalSource(initialLocalSource);
    if (initialLocalTarget) setLocalTarget(initialLocalTarget);
  }, [initialLocalSource, initialLocalTarget]);

  // International State
  const [intlSource, setIntlSource] = useState("USD");
  const [intlTarget, setIntlTarget] = useState("EUR");

  // Shared State
  const [amount, setAmount] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);
  const [keyboardInset, setKeyboardInset] = useState(0);
  const amountFocused = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const unobstructedViewport = useRef({ width: 0, height: 0 });
  const keyboardOpen = keyboardInset > 100;

  const keepResultVisible = useCallback(() => {
    if (!amountFocused.current) return;

    const viewport = window.visualViewport;
    const visibleBottom = viewport
      ? viewport.offsetTop + viewport.height
      : window.innerHeight;
    const inset = Math.max(
      0,
      window.innerHeight - visibleBottom,
      unobstructedViewport.current.height - visibleBottom,
    );
    setKeyboardInset(inset > 100 ? inset : 0);

    requestAnimationFrame(() => {
      if (!amountFocused.current) return;
      const resultBottom = resultRef.current?.getBoundingClientRect().bottom;
      if (resultBottom && resultBottom + 16 > visibleBottom) {
        window.scrollBy({
          top: resultBottom + 16 - visibleBottom,
          behavior: "auto",
        });
      }
    });
  }, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    unobstructedViewport.current = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const handleWindowResize = () => {
      if (
        !amountFocused.current ||
        unobstructedViewport.current.width !== window.innerWidth
      ) {
        unobstructedViewport.current = {
          width: window.innerWidth,
          height: window.innerHeight,
        };
      }
      keepResultVisible();
    };
    viewport?.addEventListener("resize", keepResultVisible);
    viewport?.addEventListener("scroll", keepResultVisible);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      viewport?.removeEventListener("resize", keepResultVisible);
      viewport?.removeEventListener("scroll", keepResultVisible);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [keepResultVisible]);

  useEffect(() => {
    if (amountFocused.current) keepResultVisible();
  }, [amount, result, keepResultVisible]);

  // Fetch International Rates
  const { rates: intlRates } = useInternationalRates(intlSource);

  const formatCurrency = (val: number, symbol: string = "") => {
    return format(val, "0,0.00", { locale: es }) + " " + symbol;
  };

  useEffect(() => {
    calculate();
  }, [
    amount,
    mode,
    localSource,
    localTarget,
    intlSource,
    intlTarget,
    localCurrencies,
    intlRates,
  ]);

  const calculate = () => {
    const numAmount = parseFloat(amount.replace(",", "."));
    if (isNaN(numAmount) || numAmount === 0) {
      setResult(null);
      return;
    }

    if (mode === "local") {
      // ... (Same logic as before, omitted for brevity but preserved in mental model)
      let sourceRate = 1;
      let targetRate = 1;
      if (localSource !== "Peso Argentino") {
        const sourceCurrency = findLocalCurrency(
          localSource,
          localCurrencies || [],
        );
        sourceRate = sourceCurrency?.promedio ?? 0;
      }
      if (localTarget !== "Peso Argentino") {
        const targetCurrency = findLocalCurrency(
          localTarget,
          localCurrencies || [],
        );
        targetRate = targetCurrency?.promedio ?? 0;
      }
      if (sourceRate > 0 && targetRate > 0) {
        setResult(convertLocalPivot(numAmount, sourceRate, targetRate));
      } else {
        setResult(0);
      }
    } else {
      const rate = intlRates[intlTarget];
      if (rate) {
        setResult(convertInternational(numAmount, rate));
      } else if (intlSource === intlTarget) {
        setResult(numAmount);
      } else {
        setResult(0);
      }
    }
  };

  const handleSwap = () => {
    hapticFeedback.medium();
    if (mode === "local") {
      setLocalSource(localTarget);
      setLocalTarget(localSource);
    } else {
      setIntlSource(intlTarget);
      setIntlTarget(intlSource);
    }
  };

  const handleModeChange = (
    _event: React.SyntheticEvent,
    newValue: "local" | "international",
  ) => {
    setMode(newValue);
    setAmount("");
    setResult(null);
  };

  const localOptions = localCurrencies
    ? [
        { nombre: "Peso Argentino", venta: 1, compra: 1, promedio: 1 },
        ...localCurrencies,
      ]
    : [];

  return (
    <Paper
      elevation={0}
      sx={{
        padding: keyboardOpen ? 2 : { xs: 2.5, md: 4 },
        maxWidth: 600,
        width: "100%",
        margin: "auto",
        borderRadius: 4,
        background: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        mb: keyboardInset > 0 ? `${keyboardInset + 24}px` : undefined,
      }}
    >
      {/* Toggle Mode */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: keyboardOpen ? 1.5 : 4,
        }}
      >
        <Tabs
          value={mode}
          onChange={handleModeChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            backgroundColor: "background.default",
            borderRadius: "50px",
            padding: "4px",
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          <Tab
            label="Mercado Local"
            value="local"
            sx={{
              borderRadius: "40px",
              color: "text.secondary",
              zIndex: 1,
              fontWeight: 600,
              textTransform: "none",
              minHeight: "40px",
              "&.Mui-selected": {
                backgroundColor: "background.paper",
                color: "primary.main",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              },
            }}
          />
          <Tab
            label="Internacional"
            value="international"
            sx={{
              borderRadius: "40px",
              color: "text.secondary",
              zIndex: 1,
              fontWeight: 600,
              textTransform: "none",
              minHeight: "40px",
              "&.Mui-selected": {
                backgroundColor: "background.paper",
                color: "primary.main",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
              },
            }}
          />
        </Tabs>
      </Box>

      <Grid container spacing={keyboardOpen ? 1.5 : 3} alignItems="center">
        {/* Row 1: Amount Input (Hero) */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onFocus={() => {
              amountFocused.current = true;
              keepResultVisible();
            }}
            onBlur={() => {
              amountFocused.current = false;
              setKeyboardInset(0);
            }}
            placeholder="0"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: keyboardOpen ? "3rem" : "4rem",
                fontWeight: 700,
                textAlign: "center",
                color: theme.palette.primary.main,
              },
            }}
            inputProps={{
              style: { textAlign: "center" }, // Ensure placeholder is centered too
              inputMode: "decimal",
              "aria-label": "Monto a convertir",
            }}
          />
          <Typography align="center" variant="subtitle2" color="text.secondary">
            Ingrese monto
          </Typography>
        </Grid>

        {/* Row 2: Selectors */}
        <Grid item xs={12} sx={{ mt: keyboardOpen ? 0 : 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "background.default",
              p: 2,
              borderRadius: 3,
            }}
          >
            {/* Source */}
            <TextField
              select
              variant="standard"
              value={mode === "local" ? localSource : intlSource}
              onChange={(e) =>
                mode === "local"
                  ? setLocalSource(e.target.value)
                  : setIntlSource(e.target.value)
              }
              InputProps={{
                disableUnderline: true,
                style: { fontWeight: 600 },
              }}
              sx={{ width: "40%" }}
            >
              {mode === "local"
                ? localOptions.map((c) => (
                    <MenuItem key={c.nombre} value={c.nombre}>
                      {c.nombre}
                    </MenuItem>
                  ))
                : INTERNATIONAL_CURRENCIES.map((c) => (
                    <MenuItem key={c.code} value={c.code}>
                      {c.code}
                    </MenuItem>
                  ))}
            </TextField>

            <IconButton
              onClick={handleSwap}
              sx={{ background: "background.paper", boxShadow: 1 }}
            >
              <SwapHorizIcon color="primary" />
            </IconButton>

            {/* Target */}
            <TextField
              select
              variant="standard"
              value={mode === "local" ? localTarget : intlTarget}
              onChange={(e) =>
                mode === "local"
                  ? setLocalTarget(e.target.value)
                  : setIntlTarget(e.target.value)
              }
              InputProps={{
                disableUnderline: true,
                style: { fontWeight: 600, textAlign: "right" },
              }}
              sx={{ width: "40%" }}
              inputProps={{ style: { textAlign: "right" } }}
            >
              {mode === "local"
                ? localOptions.map((c) => (
                    <MenuItem key={c.nombre} value={c.nombre}>
                      {c.nombre}
                    </MenuItem>
                  ))
                : INTERNATIONAL_CURRENCIES.map((c) => (
                    <MenuItem key={c.code} value={c.code}>
                      {c.code}
                    </MenuItem>
                  ))}
            </TextField>
          </Box>
        </Grid>

        {/* Row 3: Result */}
        <Grid
          item
          xs={12}
          ref={resultRef}
          sx={{ textAlign: "center", mt: keyboardOpen ? 1 : 4 }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Es igual a
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, color: theme.palette.secondary.main }} // Use secondary/accent for result
          >
            {result !== null ? formatCurrency(result) : "---"}
          </Typography>
          {mode === "local" && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 1 }}
            >
              Base: Promedio Informal
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InternationalCalculator;
