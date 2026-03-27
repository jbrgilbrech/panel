@extends('layouts.admin')

@section('title')
    List Users
@endsection

@section('content-header')
    <h1>Users<small>All registered users on the system.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Users</li>
    </ol>
@endsection

@section('content')
@php
    $rows = [];
    foreach ($users as $user) {
        $rows[] = [
            'avatar' => 'https://www.gravatar.com/avatar/' . md5(strtolower($user->email)) . '?s=100',
            'canAccess' => $user->subuser_of_count,
            'email' => $user->email,
            'id' => $user->id,
            'isAdmin' => (bool) $user->root_admin,
            'name' => $user->name_last . ', ' . $user->name_first,
            'ownedServers' => $user->servers_count,
            'ownedServersUrl' => route('admin.servers', ['filter[owner_id]' => $user->id]),
            'totpEnabled' => (bool) $user->use_totp,
            'username' => $user->username,
            'viewUrl' => route('admin.users.view', $user->id),
        ];
    }

    $pageData = [
        'createUrl' => route('admin.users.new'),
        'paginationHtml' => $users->hasPages() ? $users->appends(['query' => Request::input('query')])->render() : null,
        'rows' => $rows,
        'search' => request()->input('filter.email'),
    ];
@endphp
<div
    id="admin-page-root"
    data-page="users-index"
    data-props='@json($pageData)'
></div>
@endsection
