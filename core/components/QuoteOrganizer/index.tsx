import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";

type QuoteOrganizerProps = {
  open: boolean;
  isMobile: boolean;
  visible: string[];
  hidden: string[];
  onClose: () => void;
  onReorder: (active: string, target: string) => void;
  onHide: (name: string) => void;
  onShow: (name: string) => void;
  onReset: () => void;
};

type SortableQuoteProps = {
  name: string;
  index: number;
  count: number;
  onReorder: (active: string, targetIndex: number) => void;
  onHide: (name: string) => void;
};

function SortableQuote({
  name,
  index,
  count,
  onReorder,
  onHide,
}: SortableQuoteProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: name });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        px: 1,
        py: 0.5,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        backgroundColor: "background.paper",
        opacity: isDragging ? 0.65 : 1,
        position: "relative",
        zIndex: isDragging ? 1 : "auto",
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <IconButton
        size="small"
        sx={{ touchAction: "none", cursor: isDragging ? "grabbing" : "grab" }}
        {...attributes}
        {...listeners}
        aria-label={`Arrastrar ${name}`}
      >
        <DragIndicatorIcon fontSize="small" />
      </IconButton>
      <Typography sx={{ flex: 1, minWidth: 0, fontWeight: 600 }}>
        {name}
      </Typography>
      <IconButton
        size="small"
        disabled={index === 0}
        onClick={() => onReorder(name, index - 1)}
        aria-label={`Subir ${name}`}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
      <IconButton
        size="small"
        disabled={index === count - 1}
        onClick={() => onReorder(name, index + 1)}
        aria-label={`Bajar ${name}`}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => onHide(name)}
        aria-label={`Ocultar ${name}`}
      >
        <VisibilityOffOutlinedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export default function QuoteOrganizer({
  open,
  isMobile,
  visible,
  hidden,
  onClose,
  onReorder,
  onHide,
  onShow,
  onReset,
}: QuoteOrganizerProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 180, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const moveTo = (active: string, targetIndex: number) => {
    const target = visible[targetIndex];
    if (target) onReorder(active, target);
  };

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      PaperProps={{
        role: "dialog",
        "aria-labelledby": "quote-organizer-title",
        sx: {
          width: isMobile ? "100%" : 420,
          maxHeight: isMobile ? "88vh" : "100vh",
          borderTopLeftRadius: isMobile ? 20 : 0,
          borderTopRightRadius: isMobile ? 20 : 0,
          backgroundColor: "background.default",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            p: 2.5,
            pb: 1,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              id="quote-organizer-title"
              variant="h6"
              fontWeight={700}
            >
              Organizar cotizaciones
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Arrastrá para ordenar o usá las flechas.
            </Typography>
          </Box>
          <IconButton onClick={onClose} aria-label="Cerrar organización">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ px: 2.5, pb: 2.5, overflowY: "auto", minHeight: 0 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Visibles ({visible.length})
          </Typography>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
              if (over && active.id !== over.id) {
                onReorder(String(active.id), String(over.id));
              }
            }}
          >
            <SortableContext
              items={visible}
              strategy={verticalListSortingStrategy}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {visible.map((name, index) => (
                  <SortableQuote
                    key={name}
                    name={name}
                    index={index}
                    count={visible.length}
                    onReorder={moveTo}
                    onHide={onHide}
                  />
                ))}
              </Box>
            </SortableContext>
          </DndContext>
          {visible.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
              No hay cotizaciones visibles. Mostrá alguna desde la lista de
              abajo.
            </Typography>
          )}

          <Divider sx={{ my: 2.5 }} />
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Ocultas ({hidden.length})
          </Typography>
          {hidden.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No hay cotizaciones ocultas.
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {hidden.map((name) => (
                <Box
                  key={name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    py: 0.5,
                  }}
                >
                  <Typography>{name}</Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onShow(name)}
                  >
                    Mostrar
                  </Button>
                </Box>
              ))}
            </Box>
          )}

          <Button
            startIcon={<RestartAltIcon />}
            onClick={onReset}
            sx={{ mt: 3 }}
          >
            Restablecer orden y visibilidad
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
