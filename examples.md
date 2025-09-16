# Example GraphQL Queries and Mutations

## Queries

### Get All Users
```graphql
query GetUsers {
  users {
    id
    email
    name
    rides {
      id
      from
      to
      price
      createdAt
    }
    createdAt
    updatedAt
  }
}
```

### Get User by ID
```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    email
    name
    rides {
      id
      from
      to
      price
    }
    createdAt
    updatedAt
  }
}
```

### Get User by Email
```graphql
query GetUserByEmail($email: String!) {
  userByEmail(email: $email) {
    id
    email
    name
    rides {
      id
      from
      to
      price
    }
  }
}
```

### Get All Rides
```graphql
query GetRides {
  rides {
    id
    from
    to
    price
    user {
      id
      email
      name
    }
    createdAt
    updatedAt
  }
}
```

### Get Ride by ID
```graphql
query GetRide($id: ID!) {
  ride(id: $id) {
    id
    from
    to
    price
    user {
      email
      name
    }
    createdAt
  }
}
```

### Get Rides by User
```graphql
query GetRidesByUser($userId: ID!) {
  ridesByUser(userId: $userId) {
    id
    from
    to
    price
    createdAt
  }
}
```

## Mutations

### Create User
```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    email
    name
    createdAt
  }
}
```

**Variables:**
```json
{
  "input": {
    "email": "john.doe@example.com",
    "name": "John Doe"
  }
}
```

### Update User
```graphql
mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    email
    name
    updatedAt
  }
}
```

**Variables:**
```json
{
  "id": "clxxx...",
  "input": {
    "name": "John Smith"
  }
}
```

### Delete User
```graphql
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
```

**Variables:**
```json
{
  "id": "clxxx..."
}
```

### Create Ride
```graphql
mutation CreateRide($input: CreateRideInput!) {
  createRide(input: $input) {
    id
    from
    to
    price
    user {
      email
      name
    }
    createdAt
  }
}
```

**Variables:**
```json
{
  "input": {
    "from": "New York",
    "to": "Boston",
    "price": 50.0,
    "userId": "clxxx..."
  }
}
```

### Update Ride
```graphql
mutation UpdateRide($id: ID!, $input: UpdateRideInput!) {
  updateRide(id: $id, input: $input) {
    id
    from
    to
    price
    updatedAt
  }
}
```

**Variables:**
```json
{
  "id": "clxxx...",
  "input": {
    "price": 75.0
  }
}
```

### Delete Ride
```graphql
mutation DeleteRide($id: ID!) {
  deleteRide(id: $id)
}
```

**Variables:**
```json
{
  "id": "clxxx..."
}
```

## Example Workflow

1. **Create a user:**
   ```graphql
   mutation {
     createUser(input: { email: "alice@example.com", name: "Alice" }) {
       id
       email
       name
     }
   }
   ```

2. **Create a ride for the user:**
   ```graphql
   mutation {
     createRide(input: {
       from: "San Francisco"
       to: "Los Angeles"
       price: 100.0
       userId: "USER_ID_FROM_STEP_1"
     }) {
       id
       from
       to
       price
       user {
         name
       }
     }
   }
   ```

3. **Query user with rides:**
   ```graphql
   query {
     user(id: "USER_ID_FROM_STEP_1") {
       id
       email
       name
       rides {
         id
         from
         to
         price
       }
     }
   }
   ```