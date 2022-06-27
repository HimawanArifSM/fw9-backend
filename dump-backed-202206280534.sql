--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2022-06-28 05:34:27

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE backed;
--
-- TOC entry 3335 (class 1262 OID 16424)
-- Name: backed; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE backed WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE backed OWNER TO postgres;

\connect backed

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3336 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16440)
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    id_user integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    balance money,
    pin character varying,
    banking_number character varying
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16439)
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.profile ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 212 (class 1259 OID 16433)
-- Name: transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    id_profile character varying NOT NULL,
    transaction_from character varying NOT NULL,
    transaction_to character varying NOT NULL,
    amount money NOT NULL,
    date_time timestamp without time zone NOT NULL,
    transaction_type character varying NOT NULL,
    note character varying,
    status_transaction character varying NOT NULL
);


ALTER TABLE public.transaction OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16432)
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.transaction ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.transaction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 210 (class 1259 OID 16426)
-- Name: update_profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.update_profile (
    id integer NOT NULL,
    id_profile integer NOT NULL,
    old_password character varying,
    new_password character varying NOT NULL,
    old_pin character varying,
    new_pin character varying NOT NULL
);


ALTER TABLE public.update_profile OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16425)
-- Name: update_profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.update_profile ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.update_profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 16447)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id_user integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16446)
-- Name: user_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."user" ALTER COLUMN id_user ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3327 (class 0 OID 16440)
-- Dependencies: 214
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (id, id_user, first_name, last_name, balance, pin, banking_number) FROM stdin;
\.


--
-- TOC entry 3325 (class 0 OID 16433)
-- Dependencies: 212
-- Data for Name: transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction (id, id_profile, transaction_from, transaction_to, amount, date_time, transaction_type, note, status_transaction) FROM stdin;
\.


--
-- TOC entry 3323 (class 0 OID 16426)
-- Dependencies: 210
-- Data for Name: update_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.update_profile (id, id_profile, old_password, new_password, old_pin, new_pin) FROM stdin;
\.


--
-- TOC entry 3329 (class 0 OID 16447)
-- Dependencies: 216
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id_user, name, email, password) FROM stdin;
\.


--
-- TOC entry 3337 (class 0 OID 0)
-- Dependencies: 213
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_id_seq', 1, false);


--
-- TOC entry 3338 (class 0 OID 0)
-- Dependencies: 211
-- Name: transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_id_seq', 1, false);


--
-- TOC entry 3339 (class 0 OID 0)
-- Dependencies: 209
-- Name: update_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.update_profile_id_seq', 1, false);


--
-- TOC entry 3340 (class 0 OID 0)
-- Dependencies: 215
-- Name: user_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_user_seq', 1, false);


--
-- TOC entry 3181 (class 1259 OID 16445)
-- Name: profile_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX profile_id_idx ON public.profile USING btree (id, id_user, first_name, last_name, balance, pin, banking_number);


--
-- TOC entry 3180 (class 1259 OID 16438)
-- Name: transaction_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX transaction_id_idx ON public.transaction USING btree (id, id_profile, transaction_from, transaction_to, amount, date_time, transaction_type, note, status_transaction);


--
-- TOC entry 3179 (class 1259 OID 16431)
-- Name: update_profile_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX update_profile_id_idx ON public.update_profile USING btree (id, id_profile, old_password, new_password, old_pin, new_pin);


--
-- TOC entry 3182 (class 1259 OID 16452)
-- Name: user_id_user_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_id_user_idx ON public."user" USING btree (id_user, name, email, password);


-- Completed on 2022-06-28 05:34:28

--
-- PostgreSQL database dump complete
--

