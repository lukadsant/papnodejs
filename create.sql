--
-- Table structure for table `dadosSalvos`
--

CREATE TABLE `dadosSalvos` (
  `id` int(10) NOT NULL,
  `matricula` varchar(20) NOT NULL,
  `estudante` varchar(250) NOT NULL,
  `local` varchar(255) NOT NULL,
  `periodo` varchar(10) NOT NULL,
  `turno` varchar(255) NOT NULL,
  `Recebimento` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dadosSalvos`
--

INSERT INTO `dadosSalvos` (`id`, `matricula`, `estudante`, `local`, `curso`, `periodo`,`turno`,`Recebimento`) VALUES
(1, '2020202020', 'Smith', 'Abrigo 1','Enfermagem', '1','Manhã','2022-09-21 12:11:28'),
(2, '2010201010', 'Ray', 'Abrigo 2', '4','Medicina','Tarde','2022-09-22 12:11:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dadosSalvos`
--
ALTER TABLE `dadosSalvos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dadosSalvos`
--
ALTER TABLE `dadosSalvos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;