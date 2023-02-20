module.exports = {
  LAUNCHER_EVENTS: {
    START_LAUNCHER: "launcher-start",
    START_CLICKER: "launcher-start-clicker",
    NEWS_VIEWED: "launcher-news-viewed",
    PATCHNOTES_VIEWED: "launcher-patchnotes-viewed",
    START_DOWNLOAD: "launcher-start-download",
    FINISH_DOWNLOAD: "launcher-finish-download",
  },
  PASSWORD_MIN_LENGTH: 6,
  NULL_NFT_ADDRESS: "0x0000000000000000000000000000000000000000",
  CHANGE_EMAIL_PERIOD: 10 * 24 * 3600 * 1000, // Смену электронки позволять раз в 10 дней
  MIN_SHARING_RENT_TAX_PERCENT: 0,
  MAX_SHARING_RENT_TAX_PERCENT: 100,
  DB_DEFAULT_PAGE_COUNT: 20,
  MAX_FILE_UPLOAD_SIZE: 10 * 1024 * 1024, // 10 Mb
  UPLOAD_MIMETYPES: {
    CSV: "text/csv",
  },
  DEFAULT_DB_ROWS_LIMIT: 20,
  TRON_DEAD_ADDRESS: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb"
};
