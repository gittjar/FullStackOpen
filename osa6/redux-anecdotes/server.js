import jsonServer from 'json-server';
import cors from 'cors'; 

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();


server.use(cors());

// PUT
server.put('/anecdotes/:id/votes', (req, res) => {
  const id = req.params.id;
  const anecdote = router.db.get('anecdotes').find({ id }).value();

  console.log('ID:', id);
  console.log('Anecdotes:', router.db.get('anecdotes').value()); 

  if (!anecdote) {
    console.log('Anecdote not found');
    return res.status(404).send('Anecdote not found');
  }

  // Kasvata äänten määrää yhdellä
  anecdote.votes += 1;
  router.db.get('anecdotes').find({ id }).assign(anecdote).write();

  return res.json(anecdote);
});

//

server.use(middlewares);
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Tämä JSON Server on toiminnassa --> http://localhost:${PORT}`);
});
