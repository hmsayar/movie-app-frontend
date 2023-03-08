import { useState, useEffect } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface queryOpt {
    params:string[];
    request:()=>void;
    debounce:number;
}

export default function useCustomQuery({params, request, debounce=750}:queryOpt):UseQueryResult<[]>{
    
    const [newParams, setNewParams] = useState(params);
    const stringify = (obj:any) => JSON.stringify(obj);
  
    useEffect(() => {
      if (stringify(params) !== stringify(newParams)) {
        const timerId = setTimeout(
          () => setNewParams(params),
          debounce
        );
        return () => clearTimeout(timerId);
      }
    }, [params]);

    return useQuery(newParams, request);
}
  