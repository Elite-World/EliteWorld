// Export all config and content via namespaces or allow direct subpath access
// The primary usage pattern is via subpath exports (e.g. @repo/apps-config/education/site-config)

export const EducationConfig = {
    // metadata: ... // metadata file was missing
};

// We don't need to re-export everything here if we use proper subpath exports.
// Keeping this file valid and minimal to avoid build errors.
export {};
