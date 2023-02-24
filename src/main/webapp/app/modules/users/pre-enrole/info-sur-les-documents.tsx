import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Translate } from 'react-jhipster';

import { useAppSelector } from 'app/config/store';
import { Button } from 'primereact/button';
import { START_PREENROLE } from 'app/shared/const/route.const';

export const InfoDocument = () => {
  const navigate = useNavigate();

  const handleClickBegin = () => {
    navigate(START_PREENROLE);
  };

  return (
    <div>
      <h2 id="start">
        <Translate contentKey="pecapApp.preEnrole.InfoDocument.title">Titre</Translate>
      </h2>

      <div className="card"></div>
    </div>
  );
};

export default InfoDocument;
