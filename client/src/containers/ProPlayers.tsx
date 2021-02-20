import axios from 'axios';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const ProPlayers = () => {
  const [proPlayers, setProPlayers] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchProPlayers = async (pageNumber: Number) => {
    const { data } = await axios.get(
      `http://localhost:8080/user/fetch_data?page=${pageNumber}`
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
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {proPlayers.map((proPlayer: any, index: Number) => (
          <img key={proPlayer.account_id} src={proPlayer.avatarfull} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ProPlayers;
