import axios from '../axios-base';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IProPlayer from '../interfaces/proplayer.interface';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: 500,
      height: 450
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)'
    }
  })
);

const ProPlayers = () => {
  const classes = useStyles();
  const [proPlayers, setProPlayers] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchProPlayers = async (pageNumber: Number) => {
    const { data } = await axios.get<IProPlayer[]>(
      `/user/fetch_data?page=${pageNumber}`
    );
    setProPlayers(proPlayers.concat(data));
  };

  useEffect(() => {
    fetchProPlayers(pageNumber);
  }, [pageNumber]);

  return (
    <div>
      <InfiniteScroll
        dataLength={proPlayers.length}
        next={() => {
          setPageNumber(pageNumber + 1);
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more Pro players!</b>
          </p>
        }
      >
        <div className={classes.root}>
          <GridList cellHeight={180} cols={10}>
            {proPlayers.map((proPlayer: any) => (
              <GridListTile key={proPlayer.account_id}>
                <a href={proPlayer.profileurl} target="_blank">
                  <img src={proPlayer.avatarfull} alt="ProPlayer avatar" />
                  <GridListTileBar
                    title={proPlayer.personaname}
                    subtitle={<span>{proPlayer.team_name}</span>}
                  />
                </a>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ProPlayers;
