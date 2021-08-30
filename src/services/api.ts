const BASE_URL = "/api/textstrings";

const ACCESS_KEY = "0J/RgNC40LLQtdGC0LjQutC4IQ==";


export interface Line{
    id: number,
    text: string,
    error: string
}

/**
 * Fetch line according to the provided id
 * @param id line id
 * @returns line data
 */
export const loadString = async (id: number): Promise<Line> => {
  try {
    return await _loadString(id);
  } catch (error) {
    if (error instanceof Error) {
      return {id, text: "", error: error.message}      
    }
    return {id, text: "", error: "Unknown error"}
  }
};

const _loadString = async (id: number): Promise<Line> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      "TMG-Api-Key": ACCESS_KEY,
    },
  });
  if (response.ok) {
    return { id, text: (await response.json()).text, error: "" };
  }
  throw Error("Unable to load line with id " + id)  
};
