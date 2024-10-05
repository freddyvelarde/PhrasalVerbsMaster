import HttpService from "../../services/HttpService";
import { DictionaryApiResponseArray } from "../../interfaces/DictionaryApiResponse";

class DictionaryApiRequest extends HttpService {
  constructor() {
    const baseUrl =
      process.env.DICTIONARY_API_URL || "https://api.dictionaryapi.dev"; // Use env variable
    super(baseUrl);
  }

  async fetchDictionary(word: string): Promise<DictionaryApiResponseArray> {
    return this.get<DictionaryApiResponseArray>(`/api/v2/entries/en/${word}`);
  }
}

export default DictionaryApiRequest;
