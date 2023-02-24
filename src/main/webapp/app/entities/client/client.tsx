import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IClient } from 'app/shared/model/client.model';
import { getEntities } from './client.reducer';

export const Client = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const clientList = useAppSelector(state => state.client.entities);
  const loading = useAppSelector(state => state.client.loading);
  const totalItems = useAppSelector(state => state.client.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div>
      <h2 id="client-heading" data-cy="ClientHeading">
        <Translate contentKey="pecapApp.client.home.title">Clients</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="pecapApp.client.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/client/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pecapApp.client.home.createLabel">Create new Client</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {clientList && clientList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="pecapApp.client.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nom')}>
                  <Translate contentKey="pecapApp.client.nom">Nom</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prenom')}>
                  <Translate contentKey="pecapApp.client.prenom">Prenom</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('photoUrl')}>
                  <Translate contentKey="pecapApp.client.photoUrl">Photo Url</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateNaiss')}>
                  <Translate contentKey="pecapApp.client.dateNaiss">Date Naiss</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('anneeNaiss')}>
                  <Translate contentKey="pecapApp.client.anneeNaiss">Annee Naiss</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lieuNaiss')}>
                  <Translate contentKey="pecapApp.client.lieuNaiss">Lieu Naiss</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('genre')}>
                  <Translate contentKey="pecapApp.client.genre">Genre</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('typeDemande')}>
                  <Translate contentKey="pecapApp.client.typeDemande">Type Demande</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('email')}>
                  <Translate contentKey="pecapApp.client.email">Email</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('destVoyageP')}>
                  <Translate contentKey="pecapApp.client.destVoyageP">Dest Voyage P</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('motifDeplacement')}>
                  <Translate contentKey="pecapApp.client.motifDeplacement">Motif Deplacement</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('paysNaissance')}>
                  <Translate contentKey="pecapApp.client.paysNaissance">Pays Naissance</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('regionNaiss')}>
                  <Translate contentKey="pecapApp.client.regionNaiss">Region Naiss</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('departeNaiss')}>
                  <Translate contentKey="pecapApp.client.departeNaiss">Departe Naiss</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('telephone')}>
                  <Translate contentKey="pecapApp.client.telephone">Telephone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('pays')}>
                  <Translate contentKey="pecapApp.client.pays">Pays</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('region')}>
                  <Translate contentKey="pecapApp.client.region">Region</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('departement')}>
                  <Translate contentKey="pecapApp.client.departement">Departement</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lieu')}>
                  <Translate contentKey="pecapApp.client.lieu">Lieu</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('rue')}>
                  <Translate contentKey="pecapApp.client.rue">Rue</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('profession')}>
                  <Translate contentKey="pecapApp.client.profession">Profession</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prenomMere')}>
                  <Translate contentKey="pecapApp.client.prenomMere">Prenom Mere</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nomMere')}>
                  <Translate contentKey="pecapApp.client.nomMere">Nom Mere</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prenomPere')}>
                  <Translate contentKey="pecapApp.client.prenomPere">Prenom Pere</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nomPere')}>
                  <Translate contentKey="pecapApp.client.nomPere">Nom Pere</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('formatCni')}>
                  <Translate contentKey="pecapApp.client.formatCni">Format Cni</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('numeroCni')}>
                  <Translate contentKey="pecapApp.client.numeroCni">Numero Cni</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateDelivCni')}>
                  <Translate contentKey="pecapApp.client.dateDelivCni">Date Deliv Cni</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateExpCni')}>
                  <Translate contentKey="pecapApp.client.dateExpCni">Date Exp Cni</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clientList.map((client, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/client/${client.id}`} color="link" size="sm">
                      {client.id}
                    </Button>
                  </td>
                  <td>{client.nom}</td>
                  <td>{client.prenom}</td>
                  <td>{client.photoUrl}</td>
                  <td>{client.dateNaiss ? <TextFormat type="date" value={client.dateNaiss} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{client.anneeNaiss}</td>
                  <td>{client.lieuNaiss}</td>
                  <td>{client.genre}</td>
                  <td>{client.typeDemande}</td>
                  <td>{client.email}</td>
                  <td>{client.destVoyageP}</td>
                  <td>{client.motifDeplacement}</td>
                  <td>{client.paysNaissance}</td>
                  <td>{client.regionNaiss}</td>
                  <td>{client.departeNaiss}</td>
                  <td>{client.telephone}</td>
                  <td>{client.pays}</td>
                  <td>{client.region}</td>
                  <td>{client.departement}</td>
                  <td>{client.lieu}</td>
                  <td>{client.rue}</td>
                  <td>{client.profession}</td>
                  <td>{client.prenomMere}</td>
                  <td>{client.nomMere}</td>
                  <td>{client.prenomPere}</td>
                  <td>{client.nomPere}</td>
                  <td>{client.formatCni}</td>
                  <td>{client.numeroCni}</td>
                  <td>
                    {client.dateDelivCni ? <TextFormat type="date" value={client.dateDelivCni} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{client.dateExpCni ? <TextFormat type="date" value={client.dateExpCni} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/client/${client.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/client/${client.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/client/${client.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="pecapApp.client.home.notFound">No Clients found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={clientList && clientList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Client;
