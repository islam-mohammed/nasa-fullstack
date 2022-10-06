import { useCallback, useEffect, useState } from "react";

import { httpGetPlanets } from "./requests";

function usePlanets() {
  const [planets, savePlanets] = useState([]);

  const getPlanets = useCallback(async () => {
    try {
      const fetchedPlanets = await httpGetPlanets();
      savePlanets(fetchedPlanets);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  return planets;
}

export default usePlanets;
