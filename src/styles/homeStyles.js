import { StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "./commonStyles";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: "bold",
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  addButtonText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: "600",
  },
  listContainer: {
    padding: spacing.lg,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tripCard: {
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
  tripHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  tripName: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },
  tripAmount: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.primary,
  },
  tripMembers: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  tripDescription: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
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
    marginBottom: spacing.xxxl,
    lineHeight: 22,
  },
  createButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.lg,
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  createButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
});
