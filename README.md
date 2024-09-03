# api-gateway

## Run docker containers
```
docker network create hotel-reservation-app-network
docker compose up -d
```

## TODO:
- search (location, startDate, endDate, numberOfGuests) ✔️
- update username/password
- removeUser host/guest
- create accomodation (dodati benefite i fotografije)
- create reservation - proveriti preklapanja, proveri availability
- cancelReservationAccepted - proveriti da je bar jedan dan pre njenog pocetka
- u accomodation dodati flag da li je automatska ili rucna potvrda rezervacije i povezati sa reservation service-om (confirmReservation)
- ocenjivanje hosta
- ocenjivanje smestaja
- notifikacije
