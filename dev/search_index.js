var documenterSearchIndex = {"docs":
[{"location":"#Dangerous.jl","page":"Dangerous.jl","title":"Dangerous.jl","text":"","category":"section"},{"location":"","page":"Dangerous.jl","title":"Dangerous.jl","text":"Modules = [Dangerous, Dangerous.Hamiltonian, Dangerous.SpinSystem, Dangerous.Nuclei]","category":"page"},{"location":"#Dangerous.Hamiltonian.σ_x","page":"Dangerous.jl","title":"Dangerous.Hamiltonian.σ_x","text":"σ_x\n\nSingle-spin Pauli matrix.\n\nsigma_x = frac12beginpmatrix0  1  1  0endpmatrix\n\n\n\n\n\n","category":"constant"},{"location":"#Dangerous.Hamiltonian.σ_y","page":"Dangerous.jl","title":"Dangerous.Hamiltonian.σ_y","text":"σ_y\n\nSingle-spin Pauli matrix.\n\nsigma_y = frac12beginpmatrix0  -mathrmi  mathrmi  0endpmatrix\n\n\n\n\n\n","category":"constant"},{"location":"#Dangerous.Hamiltonian.σ_z","page":"Dangerous.jl","title":"Dangerous.Hamiltonian.σ_z","text":"σ_z\n\nSingle-spin Pauli matrix.\n\nsigma_z = frac12beginpmatrix1  0  0  -1endpmatrix\n\n\n\n\n\n","category":"constant"},{"location":"#Dangerous.Hamiltonian.detection_operators-Tuple{Any, Any}","page":"Dangerous.jl","title":"Dangerous.Hamiltonian.detection_operators","text":"detection_operators(sys, nuc)\n\nGenerate the relevant operators for detecting a given nucleus:\n\nX = sum_i I_ix quad Y = sum_i I_iy\n\nwhere the sum is over all spins of the given nucleus.\n\n\n\n\n\n","category":"method"},{"location":"#Dangerous.Hamiltonian.h_coupling-Tuple{Any}","page":"Dangerous.jl","title":"Dangerous.Hamiltonian.h_coupling","text":"h_coupling(sys)\n\nGenerate the spin–spin coupling Hamiltonian for a spin system, given by:\n\nH_textcoupling = sum_i neq j 2pi J_ij (I_ixI_jx + I_iyI_jy + I_izI_jz)\n\nwhere J_ij is the coupling constant between spins i and j (in Hz).\n\n\n\n\n\n","category":"method"},{"location":"#Dangerous.Hamiltonian.h_free-Tuple{Any}","page":"Dangerous.jl","title":"Dangerous.Hamiltonian.h_free","text":"h_free(sys)\n\nGenerate the free Hamiltonian for a spin system.\n\nH_textfree = H_textoffset + H_textcoupling\n\n\n\n\n\n","category":"method"},{"location":"#Dangerous.Hamiltonian.h_offset-Tuple{Any}","page":"Dangerous.jl","title":"Dangerous.Hamiltonian.h_offset","text":"h_offset(sys)\n\nGenerate the offset Hamiltonian for a spin system, given by:\n\nH_textoffset = sum_i Omega_0i I_iz\n\nwhere Omega_0i = -gamma_i B_0 - omega_textrefi is the offset angular frequency of spin i.\n\n\n\n\n\n","category":"method"},{"location":"#Dangerous.Hamiltonian.h_pulse-Tuple{Any, Any, Union{Unitful.Quantity{T, 𝐓^-1, U}, Unitful.Level{L, S, Unitful.Quantity{T, 𝐓^-1, U}} where {L, S}} where {T, U}, Any}","page":"Dangerous.jl","title":"Dangerous.Hamiltonian.h_pulse","text":"h_pulse(sys, nuc, ω1, φ)\n\nGenerate a Hamiltonian for a pulse on nucleus nuc, with angular frequency (ω1 = B1/γ) and pulse phase φ.\n\nThe angular frequency should be specified in rad/s. The pulse phase can be either specified as an angle in radians, or as one of the following symbols: :x, :y, :_x, or :_y, which correspond respectively to 0, π/2, π, and 3π/2.\n\n\n\n\n\n","category":"method"},{"location":"#Dangerous.Hamiltonian.op1-Tuple{Any, Any, Any}","page":"Dangerous.jl","title":"Dangerous.Hamiltonian.op1","text":"op1(i, n, single_spin_op)\n\nGenerate a single-spin operator acting on spin i in a system of n spins.\n\ne.g. I_1z in a 4-spin system is generated by op1(1, 4, σ_z).\n\n\n\n\n\n","category":"method"},{"location":"#Dangerous.Hamiltonian.op2-NTuple{5, Any}","page":"Dangerous.jl","title":"Dangerous.Hamiltonian.op2","text":"op2(i, j, n, single_spin_op1, single_spin_op2)\n\nGenerate a two-spin operator between spins i and j in a system of n spins.\n\ne.g. I_1zI_2x in a 4-spin system is generated by op2(1, 2, 4, σ_z, σ_x).\n\n\n\n\n\n","category":"method"},{"location":"#Dangerous.Hamiltonian.ρ_eq-Tuple{Any}","page":"Dangerous.jl","title":"Dangerous.Hamiltonian.ρ_eq","text":"ρ_eq(sys)\n\nGenerate the thermal density matrix for a spin system. Formally, this is given by\n\nrho_texteq = fracexp(-beta H)textTr(exp(-beta H)\n\nwhere beta = 1k_mathrmBT, but here we use the approximation of\n\nrho_texteq propto sum_i gamma_i I_iz\n\nThis is justified by the fact that H is very small (so exp(-beta H) approx 1 - beta H) and that the coupling term is small compared to the offset term.\n\n\n\n\n\n","category":"method"},{"location":"#Dangerous.SpinSystem.System","page":"Dangerous.jl","title":"Dangerous.SpinSystem.System","text":"System(\n    magnetic_field::MagneticField,\n    transmitter_offset::Dict{Nucleus, Real},\n    nuclei::Vector{Nucleus},\n    chemical_shifts::Vector{<:Real},\n    couplings::Matrix{Unitful.Frequency}\n)\n\nA complete specification of a spin system.\n\nTODO: SFO1 and O1P are not part of the physical spin system, but rather the spectrometer / experiment setup. It should logically be moved elsewhere.\n\nFields:\n\nmagnetic_field::MagneticField: The magnetic field strength, e.g. 22.1u\"T\".\ntransmitter_offset::Dict{Nucleus,Real}: The centre of the spectrum in ppm for each nucleus.\nnuclei::Vector{Nucleus}: The nuclei in the system.\nchemical_shifts::Vector{Float64}: The chemical shifts of the nuclei in the system, in ppm. The length of this array must match the length of nuclei.\ncouplings::Matrix{Float64}: The coupling constants between the nuclei in the system. The size of this matrix must be (length(nuclei), length(nuclei)). Note that the diagonal elements of this matrix must be zero, and for each pair of off-diagonal elements (i, j) and (j, i), one of them must be zero. The easiest way to generate this matrix is to initialise it with zeros(n, n), then set the non-zero elements.\n\n\n\n\n\n","category":"type"}]
}
