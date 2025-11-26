/* eslint-disable sonarjs/no-duplicate-string */
import { StyleSheet } from '@react-pdf/renderer'

// Modern professional color scheme
interface Colors {
  accent: string
  background: string
  border: string
  dark: string
  primary: string
  secondary: string
  white: string
}

export const colors: Colors = {
  accent: '#0066CC', // Professional blue
  background: '#F8F9FA', // Light gray background
  border: '#E0E0E0', // Light border
  dark: '#2C3E50', // Dark blue-gray for headers
  primary: '#1A1A1A', // Near black for body text
  secondary: '#5A5A5A', // Medium gray for secondary text
  white: '#FFFFFF',
}

// Modern, professional styles with two-column layout
// eslint-disable-next-line @typescript-eslint/typedef
export const styles = StyleSheet.create({
  // Achievement bullet point
  achievement: {
    color: colors.primary,
    fontSize: 10,
    lineHeight: 1.4,
    marginBottom: 2,
    marginLeft: 16,
  },
  achievementCompact: {
    color: colors.primary,
    fontSize: 9,
    lineHeight: 1.2,
    marginBottom: 0,
    marginLeft: 16,
  },
  // Company name and location
  companyRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  companyText: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: 600,
  },
  companyTextCompact: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: 600,
  },
  // Contact item in sidebar
  contactItem: {
    color: colors.primary,
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 6,
  },
  contactLabel: {
    color: colors.secondary,
    fontSize: 8,
    fontWeight: 600,
    letterSpacing: 0.5,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  // Date range
  dateText: {
    color: colors.secondary,
    fontSize: 9,
    fontStyle: 'italic',
  },
  dateTextCompact: {
    color: colors.secondary,
    fontSize: 8,
    fontStyle: 'italic',
  },
  // Education item
  educationDegree: {
    color: colors.dark,
    fontSize: 10,
    fontWeight: 600,
    marginBottom: 2,
  },
  educationInstitution: {
    color: colors.secondary,
    fontSize: 9,
    marginBottom: 4,
  },
  educationItem: {
    marginBottom: 10,
  },
  // Experience item
  experienceItem: {
    marginBottom: 8,
  },
  experienceItemCompact: {
    marginBottom: 5,
  },
  // Job title and dates row
  jobHeader: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobHeaderCompact: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  jobTitle: {
    color: colors.dark,
    fontSize: 12,
    fontWeight: 700,
  },
  jobTitleCompact: {
    color: colors.dark,
    fontSize: 11,
    fontWeight: 700,
  },
  // Left sidebar (contact, skills, education)
  leftColumn: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 16,
    width: '35%',
  },
  // Main container
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  // Name in header
  name: {
    color: colors.dark,
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  // Page
  page: {
    backgroundColor: colors.white,
    fontFamily: 'Helvetica',
  },
  // Project description
  projectDescription: {
    color: colors.primary,
    fontSize: 9,
    lineHeight: 1.4,
    marginBottom: 2,
  },
  // Project item
  projectItem: {
    marginBottom: 8,
  },
  // Project name
  projectName: {
    color: colors.dark,
    fontSize: 10,
    fontWeight: 600,
    marginBottom: 2,
  },
  // Project tech stack
  projectTech: {
    color: colors.secondary,
    fontSize: 9,
    fontStyle: 'italic',
  },
  // Right column (summary, experience, projects)
  rightColumn: {
    padding: 16,
    width: '65%',
  },
  // Section divider
  sectionDivider: {
    backgroundColor: colors.accent,
    height: 2,
    marginBottom: 6,
    marginTop: 3,
    width: 40,
  },
  // Section title
  sectionTitle: {
    color: colors.dark,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 0.8,
    marginBottom: 3,
    marginTop: 12,
    textTransform: 'uppercase',
  },
  // First section (no top margin)
  sectionTitleFirst: {
    color: colors.dark,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 0.8,
    marginBottom: 3,
    marginTop: 0,
    textTransform: 'uppercase',
  },
  // Skills container
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  skillsContainerCompact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  // Skill tag
  skillTag: {
    backgroundColor: colors.white,
    borderColor: colors.accent,
    borderRadius: 3,
    borderWidth: 1,
    color: colors.accent,
    fontSize: 9,
    fontWeight: 600,
    marginBottom: 6,
    marginRight: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  skillTagCompact: {
    backgroundColor: colors.white,
    borderColor: colors.accent,
    borderRadius: 3,
    borderWidth: 1,
    color: colors.accent,
    fontSize: 8,
    fontWeight: 500,
    marginBottom: 3,
    marginRight: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  // Summary text
  summary: {
    color: colors.primary,
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 12,
  },
  // Title/role in header
  title: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 12,
  },
  // Top header section
  topHeader: {
    backgroundColor: colors.white,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: 16,
    paddingBottom: 12,
  },
})
