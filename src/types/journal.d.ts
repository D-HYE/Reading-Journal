declare global {
  interface Journal {
    journal_id?: string;
    book_title?: string;
    book_cover?: string | null;
    book_author?: string;
    start_date?: Date | null;
    end_date?: Date | null;
    rating?: number | null;
    content?: string;
    password?: string;
    secret?: boolean;
    created_at?: string;
  }

}

export {};