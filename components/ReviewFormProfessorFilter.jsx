"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Check, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import fetchData from "@/utils/fetchClient";

const ProfessorFilter = ({
  selectedProfessor,
  updateReviewData,
  defaultProfessor,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [professors, setProfessors] = useState([]);
  const [professorSearch, setProfessorSearch] = useState("");
  const [pageable, setPageable] = useState(false);

  const searchProfessors = async () => {
    const res = await fetchData(
      `/professors?name=${professorSearch}`,
      router,
      pathname
    );

    setProfessors(res.data);
    setPageable(
      res.pagination ? res.pagination.start !== res.pagination.end : false
    );
  };

  const removeProfessor = () => {
    updateReviewData("professor", null);
  };

  return (
    <div className='space-y-3'>
      <h3>Professor</h3>
      <SelectedProfessor
        defaultProfessor={defaultProfessor}
        selectedProfessor={selectedProfessor}
        removeProfessor={removeProfessor}
      />
      {!defaultProfessor && (
        <div className='space-y-2'>
          <div className='flex space-x-3 items-center'>
            <Input
              type='text'
              placeholder='Name'
              value={professorSearch}
              onChange={(e) => setProfessorSearch(e.target.value)}
            />
            <Button type='button' onClick={searchProfessors}>
              Search
            </Button>
          </div>
          <ProfessorResults
            professors={professors}
            selectedProfessor={selectedProfessor}
            updateReviewData={updateReviewData}
          />
          <p className='text-sm text-slate-400'>
            {pageable && "More professors match the search."}
          </p>
        </div>
      )}
    </div>
  );
};

const SelectedProfessor = ({
  selectedProfessor,
  defaultProfessor,
  removeProfessor,
}) => {
  return (
    <div>
      {(defaultProfessor || selectedProfessor) && (
        <Card className='flex space-x-3 items-center p-3'>
          {!defaultProfessor && (
            <Button
              onClick={removeProfessor}
              size='icon'
              variant='outline'
              type='button'
            >
              <Minus size={13} />
            </Button>
          )}
          <p className='text-sm font-semibold'>
            {defaultProfessor?.name || selectedProfessor.name}
          </p>
          <p className='text-sm'>
            {defaultProfessor?.email || selectedProfessor.email}
          </p>
        </Card>
      )}
    </div>
  );
};

const ProfessorResults = ({
  professors,
  selectedProfessor,
  updateReviewData,
}) => {
  return (
    <div>
      {professors.length ? (
        <div className='space-y-3'>
          {professors.map((professor) => (
            <ProfessorFilterItem
              key={professor.id}
              selectedId={selectedProfessor?.id}
              professor={professor}
              updateReviewData={updateReviewData}
            />
          ))}
        </div>
      ) : (
        <p className='text-sm text-slate-400'>No professors match search</p>
      )}
    </div>
  );
};

const ProfessorFilterItem = ({ selectedId, professor, updateReviewData }) => {
  const selectProfessor = () => {
    updateReviewData("professor", professor);
  };

  return (
    <div className='flex space-x-4 items-center'>
      {selectedId ? (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button size='icon' variant='outline' type='button'>
              {selectedId === professor.id ? (
                <Check size={13} />
              ) : (
                <Plus size={13} />
              )}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className='bg-slate-900 font-semibold text-sm w-40 text-white'>
            Remove chosen professor first
          </HoverCardContent>
        </HoverCard>
      ) : (
        <Button size='icon' variant='outline' type='button'>
          <Plus size={13} onClick={selectProfessor} />
        </Button>
      )}
      <p className='text-sm font-semibold'>{professor.name}</p>
      <p className='text-sm'>{professor.email}</p>
    </div>
  );
};

export default ProfessorFilter;
