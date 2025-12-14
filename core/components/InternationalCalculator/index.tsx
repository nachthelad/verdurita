import React, { useState, useEffect } from "react";
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
import SwapVertIcon from "@mui/icons-material/SwapVert";
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
import { theme } from "@/theme/theme";
import { hapticFeedback } from "@/utils/haptics";

interface InternationalCalculatorProps {
  initialLocalSource?: string;
  initialLocalTarget?: string;
}

const InternationalCalculator = ({
  initialLocalSource = "Dolar Blue",
  initialLocalTarget = "Peso Argentino",
}: InternationalCalculatorProps) => {
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
        padding: 4,
        maxWidth: 600,
        width: "100%",
        margin: "auto",
        borderRadius: 4,
        background: "white",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Toggle Mode */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Tabs
          value={mode}
          onChange={handleModeChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            background: "#f4f6f8",
            borderRadius: "50px",
            p: 0.5,
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          <Tab
            label="Mercado Local"
            value="local"
            sx={{
              borderRadius: "40px",
              zIndex: 1,
              fontWeight: 600,
              textTransform: "none",
              minHeight: "40px",
              "&.Mui-selected": {
                backgroundColor: "white",
                color: "primary.main",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
              },
            }}
          />
          <Tab
            label="Internacional"
            value="international"
            sx={{
              borderRadius: "40px",
              zIndex: 1,
              fontWeight: 600,
              textTransform: "none",
              minHeight: "40px",
              "&.Mui-selected": {
                backgroundColor: "white",
                color: "primary.main",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
              },
            }}
          />
        </Tabs>
      </Box>

      <Grid container spacing={3} alignItems="center">
        {/* Row 1: Amount Input (Hero) */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: "4rem",
                fontWeight: 700,
                textAlign: "center",
                color: theme.palette.primary.main,
              },
            }}
            inputProps={{
              style: { textAlign: "center" }, // Ensure placeholder is centered too
              inputMode: "decimal",
            }}
          />
          <Typography align="center" variant="subtitle2" color="text.secondary">
            Ingrese monto
          </Typography>
        </Grid>

        {/* Row 2: Selectors */}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#F4F6F8",
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
              sx={{ background: "white", boxShadow: 1 }}
            >
              <SwapVertIcon color="primary" />
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
        <Grid item xs={12} sx={{ textAlign: "center", mt: 4 }}>
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
