import { StyleSheet } from "react-native";

// Common Colors
export const colors = {
  primary: "#007AFF",
  secondary: "#5856D6",
  success: "#34C759",
  danger: "#ff3b30",
  warning: "#FF9500",
  background: "#f5f5f5",
  white: "#ffffff",
  black: "#000000",
  text: "#333333",
  textSecondary: "#666666",
  textLight: "#999999",
  border: "#e0e0e0",
  borderLight: "#ddd",
  cardBackground: "#f9f9f9",
  overlay: "rgba(0, 0, 0, 0.5)",
};

// Common Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Common Font Sizes
export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
};

// Common Styles
export const commonStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Card Styles
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  // Button Styles
  primaryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.lg,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: "500",
  },
  dangerButton: {
    backgroundColor: colors.danger,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 10,
  },
  dangerButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
  smallButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  smallButtonText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: "600",
  },

  // Text Styles
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: "bold",
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text,
  },
  body: {
    fontSize: fontSize.md,
    color: colors.text,
  },
  caption: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: "600",
    marginBottom: spacing.sm,
    color: colors.text,
  },

  // Input Styles
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
    borderRadius: 10,
    fontSize: fontSize.md,
    color: colors.text,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },

  // Section Styles
  section: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    marginTop: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.text,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.xxl,
    width: "85%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    gap: spacing.md,
  },
  modalButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 10,
    alignItems: "center",
  },

  // List Styles
  emptyContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSize.xxl,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.md,
  },
  emptySubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },

  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  // Avatar Styles
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: "bold",
  },

  // Badge Styles
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  badgeText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: "600",
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },

  // Shadow
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
