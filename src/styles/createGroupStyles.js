import { StyleSheet, Platform } from "react-native";
import { colors, spacing, fontSize } from "./commonStyles";

export const createGroupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: "bold",
    marginBottom: spacing.xxl,
    color: colors.text,
  },
  inputGroup: {
    marginBottom: spacing.xxl,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: "600",
    marginBottom: spacing.sm,
    color: colors.text,
  },
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
  addMemberContainer: {
    flexDirection: "row",
    gap: 10,
  },
  memberInput: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
    borderRadius: 10,
    fontSize: fontSize.md,
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 10,
    justifyContent: "center",
  },
  addButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
  membersList: {
    marginTop: spacing.md,
  },
  memberCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  memberName: {
    fontSize: fontSize.md,
    color: colors.text,
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.danger,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  createButtonDisabled: {
    backgroundColor: "#ccc",
    shadowOpacity: 0,
  },
  createButtonText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: "bold",
  },
  cancelButton: {
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: "center",
    marginTop: spacing.md,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    fontWeight: "600",
  },
});
