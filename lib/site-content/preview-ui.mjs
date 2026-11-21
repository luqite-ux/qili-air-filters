export function previewUiState(preview, production) {
  return {
    showPreviewBar: preview,
    showAnalytics: production && !preview,
  }
}
